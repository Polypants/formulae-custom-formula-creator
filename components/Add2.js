import React, { useContext, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  SafeAreaView
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import Context from './Context'

const CalcButton = ({
  insert,
  label,
  style,
  component,
  onPress,
  largeText,
  textStyle,
  shortButton,
  extraLargeText,
  brand
}) => {
  const { theme, formulaBeingCreated, setFormulaBeingCreated } = useContext(Context)
  const textSize = () => {
    if (extraLargeText) return 40
    if (largeText) return 32
    return 20
  }
  return (
    <TouchableHighlight
      underlayColor={theme.color.underlay}
      style={[styles.button(theme), style, shortButton && { paddingHorizontal: 30, borderRadius: 60 }]}
      onPress={onPress ? onPress : () => {
        setFormulaBeingCreated({
          ...formulaBeingCreated,
          formulaArray: [...formulaBeingCreated.formulaArray, insert || label]
        })
      }}
    >
      {
        component
          ? component()
          : (
              <Text style={[
                  styles.buttonText(theme),
                  { fontSize: textSize() },
                  textStyle,
                  brand && { color: theme.color.brand }
                ]}
              >
                {label}
              </Text>
            )
      }
    </TouchableHighlight>
  )
}

const Add2 = () => {
  const { theme, formulaBeingCreated, setFormulaBeingCreated } = useContext(Context)
  const formulaDisplayScrollView = useRef(null)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
      <View style={styles.container}>
        <View style={{ flex: 0 }}>
          <ScrollView
            ref={formulaDisplayScrollView}
            showsHorizontalScrollIndicator={false}
            style={styles.formulaDisplayContainer(theme)}
            contentContainerStyle={styles.formulaDisplayContainerInner(theme)}
            onContentSizeChange={() => {
              formulaDisplayScrollView.current.scrollToEnd({ animated: true })
            }}
          >
            <Text style={styles.formulaDisplayText(theme)}>{formulaBeingCreated.formulaArray.join('')}</Text>
          </ScrollView>
        </View>
        <View style={{ flex: 0, marginRight: -10, marginLeft: -10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', marginBottom: 6 }}
          >
            <CalcButton
              label="SIN"
              insert="sin("
              shortButton
              style={{ marginRight: 6, marginLeft: 10 }}
            />
            <CalcButton
              label="COS"
              insert="cos("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="TAN"
              insert="tan("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="ASIN"
              insert="asin("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="ACOS"
              insert="acos("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="ATAN"
              insert="atan("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="SINH"
              insert="sinh("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="COSH"
              insert="cosh("
              shortButton
              style={{ marginRight: 4 }}
            />
            <CalcButton
              label="TANH"
              insert="tanh("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="ASINH"
              insert="asinh("
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="ACOSH"
              insert="acosh("
              shortButton
              style={{ marginRight: 4 }}
            />
            <CalcButton
              label="ATANH"
              insert="atanh("
              shortButton
              style={{ marginRight: 10 }}
            />
          </ScrollView>
          <LinearGradient
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[`${theme.color.background}00`, theme.color.background]}
          />
          <LinearGradient
            style={{
              position: 'absolute',
              left: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[theme.color.background, `${theme.color.background}00`]}
          />
        </View>
        <View style={{ flex: 0, marginRight: -10, marginLeft: -10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', marginBottom: 6 }}
          >
            <CalcButton
              label="√"
              shortButton
              style={{ marginRight: 6, marginLeft: 10 }}
            />
            <CalcButton
              label="!"
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="e"
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              style={{ marginRight: 6 }}
              shortButton
              label="π"
            />
            <CalcButton
              label="^"
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              style={{ marginRight: 6 }}
              shortButton
              label="Mod"
            />
            <CalcButton
              label="nCr"
              insert="C"
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              label="nPr"
              insert="P"
              shortButton
              style={{ marginRight: 6 }}
            />
            <CalcButton
              shortButton
              label="LOG"
              insert="log"
              style={{ marginRight: 6 }}
            />
            <CalcButton
              shortButton
              label="LN"
              insert="ln"
              style={{ marginRight: 10 }}
            />
          </ScrollView>
          <LinearGradient
            style={{
              position: 'absolute',
              left: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[theme.color.background, `${theme.color.background}00`]}
          />
          <LinearGradient
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[`${theme.color.background}00`, theme.color.background]}
          />
        </View>
        <View style={{ flex: 0, marginRight: -10, marginLeft: -10, height: 70 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', marginBottom: 6 }}
          >
            {formulaBeingCreated.variables.map(({ emoji, label, defaultEmoji }, index) => (
              <CalcButton
                shortButton
                key={index}
                label={`${emoji || defaultEmoji}${label ? ` ${label}` : ''}`}
                insert={emoji || defaultEmoji}
                textStyle={{ fontSize: 24 }}
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  marginLeft: index === 0 ? 10 : 0,
                  marginRight: index === formulaBeingCreated.variables.length - 1 ? 10 : 6
                }}
              />
            ))}
          </ScrollView>
          <LinearGradient
            style={{
              position: 'absolute',
              left: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[theme.color.background, `${theme.color.background}00`]}
          />
          <LinearGradient
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
              width: 10
            }}
            start={[0, 0]}
            end={[1, 0]}
            colors={[`${theme.color.background}00`, theme.color.background]}
          />
        </View>
        <View style={[styles.bottomHalf(theme)]}>
          <View style={[styles.buttonRow, { marginBottom: 6 }]}>
            <CalcButton
              label="AC"
              brand
              textStyle={{ fontSize: 26 }}
              onPress={() => {
                setFormulaBeingCreated({ ...formulaBeingCreated, formulaArray: [] })
              }}
            />
            <CalcButton
              component={() => (
                <View
                  style={{
                    backgroundColor: theme.color.brand,
                    position: 'absolute',
                    top: '32%',
                    left: '10%',
                    bottom: '32%',
                    right: '10%',
                    paddingRight: '10%',
                    borderRadius: 8,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}
                >
                  <Feather
                    name="delete"
                    color={theme.color.background}
                    size={28}
                  />
                </View>
              )}
              style={{ marginLeft: 6, flex: 2 }}
              onPress={() => {
                setFormulaBeingCreated({
                  ...formulaBeingCreated,
                  formulaArray: formulaBeingCreated.formulaArray
                    .slice(0, formulaBeingCreated.formulaArray.length - 1)
                })
              }}
            />
            <CalcButton label="÷" brand extraLargeText style={{ marginLeft: 6 }} />
          </View>
          <View style={[styles.buttonRow, { marginBottom: 6 }]}>
            <CalcButton label="7" largeText />
            <CalcButton label="8" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="9" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="×" brand extraLargeText style={{ marginLeft: 6 }} />
          </View>
          <View style={[styles.buttonRow, { marginBottom: 6 }]}>
            <CalcButton label="4" largeText />
            <CalcButton label="5" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="6" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="−" brand extraLargeText style={{ marginLeft: 6 }} />
          </View>
          <View style={[styles.buttonRow, { marginBottom: 6 }]}>
            <CalcButton label="1" largeText />
            <CalcButton label="2" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="3" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="+" brand extraLargeText style={{ marginLeft: 6 }} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton label="." extraLargeText />
            <CalcButton label="0" largeText style={{ marginLeft: 6 }} />
            <CalcButton label="(" largeText style={{ marginLeft: 6 }} />
            <CalcButton label=")" largeText style={{ marginLeft: 6 }} />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -60,
            height: 60,
            backgroundColor: theme.color.accent
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    flex: 1,
  },
  labelText: ({ color }) => ({
    fontSize: 20,
    marginBottom: 4,
    marginTop: 4,
    color: `${color.text}8`
  }),
  formulaDisplayContainer: ({ color }) => ({
    borderColor: color.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 6,
    height: 100,
  }),
  formulaDisplayContainerInner: ({ color }) => ({
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 32,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  formulaDisplayText: ({ color }) => ({
    fontSize: 28,
    color: color.text,
    textAlign: 'right'
  }),
  buttonRow: {
    flexDirection: 'row',
    flex: 1
  },
  button: ({ color }) => ({
    backgroundColor: color.accent,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  buttonText: ({ color }) => ({
    color: color.text,
    fontSize: 18
  }),
  bottomHalf: ({ color }) => ({
    backgroundColor: color.accent,
    flex: 1,
    marginHorizontal: -10,
  })
})

export default Add2
