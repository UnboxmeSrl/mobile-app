import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButton, CustomHeader } from '../../../components'
import { COLORS, FONTS } from '../../../constants'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useAuthCodeFromFriend } from './hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { commonStyle } from '../../../utils'

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
    handleSkipPress,
    handleBackPress,
    handleNextPress,
  } = useAuthCodeFromFriend()

  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <CustomHeader title={'Code from friend'} step={10} handleBackPress={handleBackPress} />
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
              maxLength={1}
              onChangeText={(val) => {
                setCodeLetter1(val)
                if (val) {
                  code2Ref?.current?.focus()
                }
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
              maxLength={1}
              onChangeText={(val) => {
                setCodeLetter2(val)
                if (val) {
                  code3Ref?.current?.focus()
                }
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
              maxLength={1}
              onChangeText={(val) => {
                setCodeLetter3(val)
                if (val) {
                  code4Ref?.current?.focus()
                }
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
              maxLength={1}
              onChangeText={(val) => {
                setCodeLetter4(val)
                if (val) {
                  code5Ref?.current?.focus()
                }
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
              maxLength={1}
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

        <TouchableOpacity onPress={handleSkipPress} activeOpacity={0.5} style={styles.skipContainer}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          <CustomButton title={'Next'} handlePress={handleNextPress} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default AuthCodeFromFriendScreen

const styles = StyleSheet.create({
  skipText: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
    color: COLORS.black,
  },
  skipContainer: {
    marginTop: verticalScale(45),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
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
    color: COLORS.newPrimary,
  },
  codeText: {
    flex: 1,
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(23.15),
    color: COLORS.gray,
    textAlign: 'center',
    width: '100%',
  },
  codeContainerWithFocus: {
    borderColor: COLORS.newPrimary,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    ...commonStyle.containerPaddingTop,
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
