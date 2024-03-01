import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader } from '../../../components'
import { COLORS, FONTS } from '../../../constants'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useAuthCodeFromFriend } from './hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AuthCodeFromFriendScreen = () => {
  const {
    codeLetter1,
    code1Ref,
    setCodeLetter1,
    codeLetter2,
    code2Ref,
    setCodeLetter2,
    codeLetter3,
    code3Ref,
    setCodeLetter3,
    codeLetter4,
    code4Ref,
    setCodeLetter4,
    codeLetter5,
    code5Ref,
    setCodeLetter5,
    focusedTextInput,
    setFocusedTextInput,
    isError,
    handleNextPress,
  } = useAuthCodeFromFriend()

  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <CustomHeader title={'Code from friend'} step={10} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            If you came at the invitation of another user and they gave you their promo code, then enter it here!
          </Text>
        </View>

        <View style={styles.codeMainContainer}>
          <View
            style={[
              styles.codeContainer,
              focusedTextInput === 1 && styles.codeContainerWithFocus,
              isError && styles.codeContainerWithError,
            ]}
          >
            <TextInput
              ref={code1Ref}
              value={codeLetter1}
              onChangeText={(val) => {
                setCodeLetter1(val)
                code2Ref?.current?.focus()
              }}
              onFocus={() => setFocusedTextInput(1)}
              style={[
                styles.codeText,
                focusedTextInput === 1 && styles.codeTextWithFocus,
                isError && styles.codeTextWithError,
              ]}
            />
          </View>
          <View
            style={[
              styles.codeContainer,
              focusedTextInput === 2 && styles.codeContainerWithFocus,
              isError && styles.codeContainerWithError,
            ]}
          >
            <TextInput
              ref={code2Ref}
              value={codeLetter2}
              onChangeText={(val) => {
                setCodeLetter2(val)
                code3Ref?.current?.focus()
              }}
              onFocus={() => setFocusedTextInput(2)}
              style={[
                styles.codeText,
                focusedTextInput === 2 && styles.codeTextWithFocus,
                isError && styles.codeTextWithError,
              ]}
            />
          </View>
          <View
            style={[
              styles.codeContainer,
              focusedTextInput === 3 && styles.codeContainerWithFocus,
              isError && styles.codeContainerWithError,
            ]}
          >
            <TextInput
              ref={code3Ref}
              value={codeLetter3}
              onChangeText={(val) => {
                setCodeLetter3(val)
                code4Ref?.current?.focus()
              }}
              onFocus={() => setFocusedTextInput(3)}
              style={[
                styles.codeText,
                focusedTextInput === 3 && styles.codeTextWithFocus,
                isError && styles.codeTextWithError,
              ]}
            />
          </View>
          <View
            style={[
              styles.codeContainer,
              focusedTextInput === 4 && styles.codeContainerWithFocus,
              isError && styles.codeContainerWithError,
            ]}
          >
            <TextInput
              ref={code4Ref}
              value={codeLetter4}
              onChangeText={(val) => {
                setCodeLetter4(val)
                code5Ref?.current?.focus()
              }}
              onFocus={() => setFocusedTextInput(4)}
              style={[
                styles.codeText,
                focusedTextInput === 4 && styles.codeTextWithFocus,
                isError && styles.codeTextWithError,
              ]}
            />
          </View>
          <View
            style={[
              styles.codeContainer,
              focusedTextInput === 5 && styles.codeContainerWithFocus,
              isError && styles.codeContainerWithError,
            ]}
          >
            <TextInput
              ref={code5Ref}
              value={codeLetter5}
              onChangeText={(val) => setCodeLetter5(val)}
              onFocus={() => setFocusedTextInput(5)}
              style={[
                styles.codeText,
                focusedTextInput === 5 && styles.codeTextWithFocus,
                isError && styles.codeTextWithError,
              ]}
            />
          </View>
        </View>
        {isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>* Your code is unvalid. Please check it.</Text>
          </View>
        )}

        <View style={styles.btnContainer}>
          <CustomButton title={'Next'} handlePress={handleNextPress} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default AuthCodeFromFriendScreen

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: verticalScale(250),
  },
  codeTextWithError: {
    color: COLORS.error,
  },
  codeContainerWithError: {
    borderColor: COLORS.error,
  },
  codeMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: verticalScale(50),
  },
  codeTextWithFocus: {
    color: COLORS.primary,
  },
  codeText: {
    flex: 1,
    fontFamily: FONTS.interBold,
    fontSize: moderateScale(23.15),
    color: COLORS.gray,
    textAlign: 'center',
    width: '100%',
  },
  codeContainerWithFocus: {
    borderColor: COLORS.primary,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  descriptionText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  descriptionContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(8),
    width: '87%',
  },
  codeContainer: {
    marginTop: verticalScale(15),
    height: verticalScale(50.79),
    width: scale(54.3),
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: COLORS.gainsboro,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: FONTS.quicksand,
    textAlign: 'center',
    color: COLORS.error,
    fontSize: moderateScale(15),
  },
  errorContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(24),
    width: '87%',
  },
})
