import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableHighlight,
  Clipboard,
  Dimensions
} from 'react-native'
import mexp from 'math-expression-evaluator'
import AntDesign from '@expo/vector-icons/AntDesign'

import Context from './Context'

const screenHeight = Math.round(Dimensions.get('window').height)

const Formula = () => {
  const { selectedFormula: item, theme } = useContext(Context)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [variableValues, setVariableValues] = useState(item.variables.map(item => ({ ...item, value: '' })))

  const resultText = `${
    item.resultPrefix
  }${
    item.resultDecimalPlaces
      ? Number(result).toFixed(Number(item.resultDecimalPlaces))
      : result
  }${
    item.resultSuffix
  }`

  const onClearFieldsPress = () => {
    setVariableValues(item.variables.map(v => ({ ...v, value: '' })))
  }

  const onCopyPress = () => {
    if (result.length > 0) Clipboard.setString(resultText)
  }

  const getInfinityText = () => {
    const infinityMessages = [
      'This hurts my 🧠...',
      'A lot 🤪',
      'Too much 😤',
      "💫💫💫"
    ]
    return infinityMessages[Math.floor(Math.random() * infinityMessages.length)]
  }

  useEffect(() => {
    if (
      variableValues
        .every(({ value, defaultValue }) => value.length > 0 || (defaultValue && defaultValue.length > 0))
    ) {
      const formulaString = item.formulaArray.map(char => {
        if (char === '×') return '*'
        if (char === '÷') return '/'
        if (char === '−') return '-'
        if (char === 'π') return 'pi'
        if (char === '√') return 'root'
        console.log('variableValues: ', variableValues)
        console.log(
          'some: ',
          variableValues
            .some(({ emoji, defaultEmoji }) => emoji === char || defaultEmoji === char)
        )
        if (
          variableValues
            .some(({ emoji, defaultEmoji }) => emoji === char || defaultEmoji === char)
        ) {
          const match = variableValues.find(
            ({ emoji, defaultEmoji }) => emoji === char || defaultEmoji === char
          )
          return match.value.length > 0 ? match.value : match.defaultValue
        }
        return char
      }).join('')
      try {
        console.log('formulaString: ', formulaString)
        const resultString = mexp.eval(formulaString)
        setResult(`${resultString}`)
        if (error.length > 0) setError('')
      } catch (e) {
        if (e.message) setError(e.message)
      }
    } else {
      setError('')
      setResult('')
    }
  }, [variableValues])

  return (
    <ScrollView
      style={styles.container(theme)}
      contentContainerStyle={styles.contentContainer(theme)}
    >
      <Text style={styles.formula(theme)}>{item.formulaArray.join('')}</Text>
      {item.variables.map(({ label, emoji, defaultValue, defaultEmoji }, index) => (
        <View key={`${index}`} style={styles.textInputContainer}>
          <Text style={styles.textInputLabel(theme)}>{emoji || defaultEmoji}</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput(theme)}
            placeholder={
              `${
                label ? label : `Variable ${index + 1}`
              }${
                defaultValue ? ` (${defaultValue})` : ''
              }`
            }
            placeholderTextColor={`${theme.color.text}8`}
            value={variableValues[index].value}
            onChangeText={text => {
              const newArray = variableValues.slice()
              newArray[index] = { ...variableValues[index], value: text }
              setVariableValues(newArray)
            }}
          />
          {variableValues[index].value.length > 0 && (
            <TouchableHighlight
              underlayColor={theme.color.underlay}
              style={styles.textInputClearContainer(theme)}
              onPress={() => {
                const newVariableValues = variableValues.slice()
                newVariableValues[index] = { ...variableValues[index], value: '' }
                setVariableValues(newVariableValues)
              }}
            >
              <AntDesign
                name="closecircle"
                color={theme.color.text}
                size={18}
                style={styles.textInputClear(theme)}
              />
            </TouchableHighlight>
          )}
        </View>
      ))}
      <View style={styles.resultContainer(theme)}>
        {result.length > 0 && error.length === 0 ? (
          <Text style={styles.resultText(theme)} selectable={true}>
            {result === 'Infinity' ? getInfinityText() : resultText}
          </Text>
        ) : (
          <Text style={[styles.resultText(theme), { color: `${theme.color.text}8` }]}>
            {
              error.length > 0
                ? error
                    .replace('*', '×')
                    .replace('−', '-')
                    .replace('pi', 'π')
                    .replace('/', '÷')
                :'Result'
            }
          </Text>
        )}
        <AntDesign
          name="copy1"
          color={theme.color.text}
          size={26}
          onPress={onCopyPress}
          style={{ opacity: result.length > 0 ? 1 : 0.4 }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          underlayColor={theme.color.underlay}
          style={styles.button(theme)}
          onPress={onClearFieldsPress}
        >
          <Text style={styles.buttonText(theme)}>Clear Inputs</Text>
        </TouchableHighlight>
      </View>
      {item.description.length > 0 && (
        <>
          <Text style={styles.labelText(theme)}>Description</Text>
          <Text style={styles.descriptionText(theme)}>{item.description}</Text>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: ({ color }) => ({
    backgroundColor: color.background
  }),
  contentContainer: ({ color }) => ({
    backgroundColor: color.background,
    alignItems: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: screenHeight / 2,
  }),
  formula: ({ color }) => ({
    fontSize: 34,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: color.text
  }),
  textInput: ({ color }) => ({
    fontSize: 16,
    backgroundColor: color.accent,
    borderRadius: 8,
    padding: 12,
    paddingLeft: 14,
    paddingRight: 40,
    color: color.text,
    flex: 1
  }),
  textInputClearContainer: ({ color }) => ({
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    height: '100%',
    width: 36,
  }),
  textInputClear: ({ color }) => ({
    color: color.text
  }),
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInputLabel: () => ({
    fontSize: 30,
    marginRight: 6
  }),
  resultText: ({ color }) => ({
    textAlign: 'center',
    fontSize: 20,
    color: color.text
  }),
  resultContainer: ({ color }) => ({
    borderColor: color.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 6,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }),
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  button: ({ color }) => ({
    backgroundColor: color.accent,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center'
  }),
  buttonText: ({ color }) => ({
    color: color.text,
    fontSize: 16
  }),
  labelText: ({ color }) => ({
    fontSize: 20,
    marginBottom: 4,
    marginTop: 4,
    color: `${color.text}8`
  }),
  descriptionText: ({ color }) => ({
    color: `${color.text}8`,
    fontSize: 16
  })
})

export default Formula
