import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'
import { BottomSheet } from '../../BottomSheet'
import { CustomButton, CustomTextInput, CustomTitle } from '../../Custom'
import { useSignUpWithEmail } from './hooks'

const SignUpWithEmail = React.forwardRef(({}, ref) => {
  const { email, setEmail, isSendPress } = useSignUpWithEmail()

  return (
    <BottomSheet ref={ref}>
      <View style={styles.mainContainer}>
        <CustomTitle title={'Enter your email'} />
        <CustomTextInput
          placeholder={'Ex: Chakir@gmail.com'}
          value={email}
          handleOnChangeText={setEmail}
          keyboardType="email-address"
          isRemoveTextIconVisible={true}
        />

        {isSendPress && (
          <>
            <View style={styles.codeDescriptionContainer}>
              <Text style={styles.codeDescriptionText}>
                We just sent you a temporary login code. Please check your inbox.
              </Text>
            </View>
            <CustomTextInput placeholder={'Code'} isRemoveTextIconVisible={true} />
          </>
        )}

        <CustomButton title={'Send a message'} handlePress={() => {}} />
      </View>
    </BottomSheet>
  )
})

export default SignUpWithEmail

const styles = StyleSheet.create({
  codeDescriptionText: {
    fontFamily: FONTS.quicksand,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.greyFont,
    fontSize: moderateScale(15),
  },
  codeDescriptionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: verticalScale(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
})
