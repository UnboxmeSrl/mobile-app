import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import { COLORS } from '../../../constants/colors'
import { FONTS } from '../../../constants/fonts'

import { useSignUpWithEmail } from './hooks'

const SignUpWithEmail = React.forwardRef(({}, ref) => {
  const { height } = useSignUpWithEmail()
  return (
    <RBSheet
      closeOnDragDown
      customStyles={{
        container: styles.containerStyle,
      }}
      height={verticalScale(height / 2)}
      keyboardAvoidingViewEnabled
      ref={ref}
    >
      <View style={styles.mainContainer}>
        <View style={{ marginLeft: scale(24) }}>
          <Text style={styles.emailTitleText}>Enter your email</Text>
        </View>
        <TextInput
          style={{
            alignSelf: 'center',
            borderColor: COLORS.gainsboro,
            borderRadius: moderateScale(10),
            borderWidth: moderateScale(1),
            height: verticalScale(48),
            marginTop: verticalScale(22),
            width: '88%',
          }}
        />
      </View>
    </RBSheet>
  )
})

export default SignUpWithEmail

const styles = StyleSheet.create({
  containerStyle: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  emailTitleText: {
    color: COLORS.achromaticBlack,
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: verticalScale(24),
  },
})
