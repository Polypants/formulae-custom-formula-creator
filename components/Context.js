import React, { createContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native-appearance'
import { AsyncStorage } from 'react-native'

import { lightTheme, darkTheme } from '../constants/themes'

const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [formulae, setFormulae] = useState([])
  const [selectedFormulaIndex, setSelectedFormulaIndex] = useState(0)
  const [formulaBeingCreated, setFormulaBeingCreated] = useState({
    title: '',
    formula: '',
    variables: [
      { emoji: '', label: '', defaultValue: '' }
    ],
    description: '',
    resultPrefix: '',
    resultSuffix: '',
    resultDecimalPlaces: ''
  })
  const deviceTheme = useColorScheme()
  const theme = deviceTheme === 'dark' ? darkTheme : lightTheme
  const selectedFormula = formulae[selectedFormulaIndex]
  useEffect(() => {
    const setStoredFormulae = async () => {
      await AsyncStorage.setItem('formulae', JSON.stringify(formulae))
    }
    setStoredFormulae()
  }, [formulae])
  return (
    <Context.Provider
      value={{
        formulae,
        setFormulae,
        selectedFormula,
        setSelectedFormulaIndex,
        selectedFormulaIndex,
        theme,
        formulaBeingCreated,
        setFormulaBeingCreated
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
