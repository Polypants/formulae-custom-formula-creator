import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import emojiRegex from 'emoji-regex'
import randomEmoji from 'random-unicode-emoji'

import Context from './Context'

const screenHeight = Math.round(Dimensions.get('window').height)

const Add = ({ navigation }) => {
  const {
    theme,
    setFormulaBeingCreated,
    formulaBeingCreated,
    selectedFormulaIndex,
    setFormulae,
    formulae
  } = useContext(Context)

  const onAddButtonPress = () => {
    const [defaultEmoji] = randomEmoji.random({ count: 1 })
    setFormulaBeingCreated({
      ...formulaBeingCreated,
      variables: [
        ...formulaBeingCreated.variables,
        { label: '', emoji: '', defaultValue: '', defaultEmoji }
      ]
    })
  }

  return (
    <ScrollView
      style={styles.container(theme)}
      contentContainerStyle={styles.contentContainer(theme)}
    >
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput(theme)}
          placeholder="Formula name"
          placeholderTextColor={`${theme.color.text}8`}
          value={formulaBeingCreated.title}
          onChangeText={text => {
            setFormulaBeingCreated({ ...formulaBeingCreated, title: text })
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          multiline={true}
          style={[styles.textInput(theme)]}
          placeholder="Formula description"
          placeholderTextColor={`${theme.color.text}8`}
          value={formulaBeingCreated.description}
          onChangeText={text => {
            setFormulaBeingCreated({ ...formulaBeingCreated, description: text })
          }}
        />
      </View>
      {formulaBeingCreated.variables.map(({ label, emoji, defaultValue, defaultEmoji }, index) => (
        <View key={`${index}`}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: 38
            }}
          >
            <Text style={styles.labelText(theme)}>Variable {index + 1}</Text>
            {index > 0 && (
              <AntDesign
                name="closecircleo"
                color={theme.color.text} size={20}
                style={{ marginBottom: 4 }}
                onPress={() => {
                  const newArray = formulaBeingCreated.variables.slice()
                  newArray.splice(index, 1)
                  setFormulaBeingCreated({ ...formulaBeingCreated, variables: newArray })
                }}
              />
            )}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput(theme)}
              placeholder="Label"
              placeholderTextColor={`${theme.color.text}8`}
              value={label}
              onChangeText={text => {
                const newArray = formulaBeingCreated.variables.slice()
                newArray[index] = { ...formulaBeingCreated.variables[index], label: text }
                setFormulaBeingCreated({ ...formulaBeingCreated, variables: newArray })
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.textInputContainer, { flex: 1 }]}>
              <TextInput
                style={[styles.textInput(theme), { marginRight: 6 }]}
                placeholder={`Emoji (${defaultEmoji})`}
                placeholderTextColor={`${theme.color.text}8`}
                value={emoji}
                onKeyPress={({ nativeEvent: { key } }) => {
                  const newArray = formulaBeingCreated.variables.slice()
                  if (key.match(emojiRegex))
                    newArray[index] = { ...formulaBeingCreated.variables[index], emoji: key }
                  else if (key === 'Backspace')
                    newArray[index] = { ...formulaBeingCreated.variables[index], emoji: '' }
                  setFormulaBeingCreated({ ...formulaBeingCreated, variables: newArray })
                }}
              />
              <TextInput
                keyboardType="numeric"
                style={styles.textInput(theme)}
                placeholder="Default value"
                placeholderTextColor={`${theme.color.text}8`}
                value={defaultValue}
                onChangeText={text => {
                  const newArray = formulaBeingCreated.variables.slice()
                  newArray[index] = { ...formulaBeingCreated.variables[index], defaultValue: text }
                  setFormulaBeingCreated({ ...formulaBeingCreated, variables: newArray })
                }}
              />
            </View>
          </View>
        </View>
      ))}
      <View style={[styles.buttonsContainer, { marginBottom: 20 }]}>
        <TouchableHighlight
          underlayColor={theme.color.underlay}
          style={[
            styles.button(theme),
            {
              marginTop: 38,
              paddingTop: 12,
              paddingBottom: 12,
              flexDirection: 'row',
              justifyContent: 'center'
            }
          ]}
          onPress={onAddButtonPress}
        >
          <Text style={{ color: theme.color.text, marginLeft: 4, fontSize: 20 }}>Add Variable</Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.labelText(theme)}>Result formatting</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.textInput(theme), { marginRight: 6 }]}
          placeholder="Prefix"
          placeholderTextColor={`${theme.color.text}8`}
          value={formulaBeingCreated.resultPrefix}
          onChangeText={text => {
            setFormulaBeingCreated({ ...formulaBeingCreated, resultPrefix: text })
          }}
        />
        <TextInput
          style={[styles.textInput(theme)]}
          placeholder="Suffix"
          placeholderTextColor={`${theme.color.text}8`}
          value={formulaBeingCreated.resultSuffix}
          onChangeText={text => {
            setFormulaBeingCreated({ ...formulaBeingCreated, resultSuffix: text })
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.textInput(theme)]}
          placeholder="Number of decimal places"
          placeholderTextColor={`${theme.color.text}8`}
          value={formulaBeingCreated.resultDecimalPlaces}
          onChangeText={text => {
            setFormulaBeingCreated({ ...formulaBeingCreated, resultDecimalPlaces: text })
          }}
        />
      </View>
      {formulaBeingCreated.isEdit && (
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            underlayColor={theme.color.underlay}
            style={[
              styles.button(theme),
              {
                backgroundColor: theme.color.warning,
                marginTop: 38,
                paddingTop: 12,
                paddingBottom: 12,
                flexDirection: 'row',
                justifyContent: 'center'
              }
            ]}
            onPress={() => {
              setFormulae(
                formulae
                  .slice(0, selectedFormulaIndex)
                  .concat(formulae.slice(selectedFormulaIndex + 1, formulae.length))
              )
              navigation.navigate('home')
            }}
          >
            <Text style={{ color: 'white', marginLeft: 4, fontSize: 20 }}>Delete Formula</Text>
          </TouchableHighlight>
        </View>
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
    paddingBottom: screenHeight / 2
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
  textInput: ({ color }) => ({
    fontSize: 20,
    backgroundColor: color.accent,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
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
    top: 0,
    height: 44,
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
  labelText: ({ color }) => ({
    fontSize: 22,
    marginBottom: 4,
    marginTop: 4,
    color: `${color.text}8`
  }),
})

export default Add
