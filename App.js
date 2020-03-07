import React from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AntDesign from '@expo/vector-icons/AntDesign'
import { AppearanceProvider } from 'react-native-appearance'

import Context, { ContextProvider } from './components/Context'
import Home from './components/Home'
import Add from './components/Add'
import Add2 from './components/Add2'
import Formula from './components/Formula'

const { Navigator, Screen } = createStackNavigator()

const getAddTitle = (isEdit, title) => {
  if (title) return title
  if (isEdit) return 'Edit Formula'
  return 'New Formula'
}

const App = () => {
  return (
    <AppearanceProvider>
      <ContextProvider>
        <Context.Consumer>
          {({
            selectedFormula,
            selectedFormulaIndex,
            formulaBeingCreated,
            setFormulaBeingCreated,
            setFormulae,
            formulae,
            theme: { color }
          }) => (
            <View style={{ backgroundColor: color.background, flex: 1 }}>
              <NavigationContainer>
                <Navigator>
                  <Screen
                    name="home"
                    component={Home}
                    options={({ navigation }) => ({
                      title: 'Formulae',
                      headerTintColor: color.brand,
                      headerTitleAlign: 'center',
                      headerStyle: {
                        backgroundColor: color.background
                      },
                      headerTitleStyle: {
                        color: color.brand
                      },
                      headerRight: () => (
                        <AntDesign
                          name="plus"
                          color={color.brand}
                          size={26}
                          onPress={() => {
                            navigation.navigate('add')
                          }}
                          style={{ marginRight: 10 }}
                        />
                      )
                    })}
                  />
                  <Screen
                    name="add"
                    component={Add}
                    options={({ navigation }) => ({
                      title: getAddTitle(formulaBeingCreated.isEdit, formulaBeingCreated.title),
                      headerTintColor: color.brand,
                      headerBackTitle: 'Back',
                      headerTitleAlign: 'center',
                      headerStyle: {
                        backgroundColor: color.background,
                        borderBottomColor: color.border
                      },
                      headerTitleStyle: {
                        color: color.brand
                      },
                      headerRight: () => (
                        <TouchableHighlight
                          onPress={() => {
                            navigation.navigate('add2')
                          }}
                          underlayColor={color.underlay}
                          style={{ padding: 10, height: '100%', justifyContent: 'center' }}
                        >
                          <Text style={{ color: color.brand, fontSize: 18 }}>Next</Text>
                        </TouchableHighlight>
                      )
                    })}
                  />
                  <Screen
                    name="add2"
                    component={Add2}
                    options={({ navigation }) => ({
                      title: getAddTitle(formulaBeingCreated.isEdit, formulaBeingCreated.title),
                      headerBackTitle: 'Back',
                      headerTitleAlign: 'center',
                      headerTintColor: color.brand,
                      headerStyle: {
                        backgroundColor: color.background,
                        borderBottomColor: color.border
                      },
                      headerTitleStyle: {
                        color: color.brand
                      },
                      headerRight: () => (
                        <TouchableHighlight
                          onPress={() => {
                            if (formulaBeingCreated.formulaArray.length > 0) {
                              if (formulaBeingCreated.isEdit) {
                                setFormulae(formulae
                                    .slice(0, selectedFormulaIndex)
                                    .concat([formulaBeingCreated])
                                    .concat(formulae.slice(selectedFormulaIndex + 1, formulae.length))
                                )
                              } else setFormulae([...formulae, formulaBeingCreated])
                              navigation.navigate('home')
                            }
                          }}
                          underlayColor={color.underlay}
                          style={{
                            padding: 10,
                            height: '100%',
                            justifyContent: 'center',
                            opacity: formulaBeingCreated.formulaArray.length > 0 ? 1 : 0.3
                          }}
                        >
                          <Text style={{ color: color.brand, fontSize: 18 }}>Save</Text>
                        </TouchableHighlight>
                      )
                    })}
                  />
                  <Screen
                    name="formula"
                    component={Formula}
                    options={({ navigation }) => ({
                      title: selectedFormula ? selectedFormula.title : '',
                      headerBackTitle: 'Back',
                      headerTintColor: color.brand,
                      headerTitleAlign: 'center',
                      headerStyle: {
                        backgroundColor: color.background
                      },
                      headerTitleStyle: {
                        color: color.brand
                      },
                      headerRight: () => (
                        <AntDesign
                          name="edit"
                          color={color.brand}
                          size={30}
                          onPress={() => {
                            setFormulaBeingCreated({ ...selectedFormula, isEdit: true })
                            navigation.navigate('add')
                          }}
                          style={{ marginRight: 10 }}
                        />
                      )
                    })}
                  />
                </Navigator>
              </NavigationContainer>
            </View>
          )}
        </Context.Consumer>
      </ContextProvider>
    </AppearanceProvider>
  )
}

const AppContainer = () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
)

export default AppContainer
