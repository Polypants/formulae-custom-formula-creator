import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableHighlight, FlatList, View, AsyncStorage, ActivityIndicator } from 'react-native'
import randomEmoji from 'random-unicode-emoji'

import Context from './Context'

const Item = ({ title, onPress, theme, isLast }) => (
  <TouchableHighlight
    underlayColor={theme.color.underlay}
    onPress={onPress}
    style={[styles.itemContainer(theme), isLast && { marginBottom: 50 }]}
  >
    <Text style={styles.itemTitle(theme)}>{title}</Text>
  </TouchableHighlight>
)

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { formulae, setFormulae, setSelectedFormulaIndex, theme, setFormulaBeingCreated } = useContext(Context)

  const onItemPress = index => {
    setSelectedFormulaIndex(index)
    navigation.navigate('formula')
  }

  useEffect(() => {
    const getStoredFormulae = async () => {
      const storedFormulae = await AsyncStorage.getItem('formulae')
      setFormulae(JSON.parse(storedFormulae) || [])
      setIsLoading(false)
    }
    getStoredFormulae()
    const onFocus = navigation.addListener('focus', () => {
      const [defaultEmoji] = randomEmoji.random({ count: 1 })
      setFormulaBeingCreated({
        title: '',
        formulaArray: [],
        variables: [
          { emoji: '', label: '', defaultValue: '', defaultEmoji }
        ],
        description: '',
        resultPrefix: '',
        resultSuffix: '',
        resultDecimalPlaces: ''
      })
    })
    return onFocus
  }, [])

  const getRenderComponent = () => {
    if (isLoading) return (
      <ActivityIndicator size="large" color={theme.color.brand} style={{ margin: 30 }} />
    )
    if (formulae.length > 0) return (
      <FlatList
        data={formulae}
        renderItem={({ item, index }) => (
          <Item
            title={item.title.length > 0 ? item.title : item.formulaArray.join('')}
            onPress={() => {
              onItemPress(index)
            }}
            theme={theme}
            isLast={index === formulae.length - 1}
          />
        )}
        keyExtractor={(_item, index) => `${index}`}
      />
    )
    else return (
      <Text style={styles.noFormulasText(theme)}>
        Press the "+" button to add a formula.
      </Text>
    )
  }

  return (
    <View
      style={[
        styles.container(theme),
        formulae.length === 0 && { justifyContent: 'center', alignItems: 'center' }
      ]}
    >
      {getRenderComponent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: ({ color }) => ({
    flex: 1,
    backgroundColor: color.background,
    alignItems: 'stretch'
  }),
  itemContainer: ({ color }) => ({
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    justifyContent: 'center',
    padding: 20
  }),
  itemTitle: ({ color }) => ({
    fontSize: 20,
    color: color.text
  }),
  noFormulasText: ({ color }) => ({
    color: `${color.text}8`,
    textAlign: 'center',
    fontSize: 40,
    marginLeft: 30,
    marginRight: 30
  })
})

export default Home
