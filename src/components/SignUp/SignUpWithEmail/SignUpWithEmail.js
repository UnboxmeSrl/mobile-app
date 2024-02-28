import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSignUpWithEmail } from './hooks'
import { COLORS } from '../../../constants/colors'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters'
import { FONTS } from '../../../constants/fonts'

const SignUpWithEmail = React.forwardRef(({}, ref) => {
  const { height } = useSignUpWithEmail()
  return (
    <RBSheet
      ref={ref}
      height={verticalScale(height / 2)}
      closeOnDragDown
      customStyles={{
        container: styles.containerStyle,
      }}
      keyboardAvoidingViewEnabled
    >
      <View style={styles.mainContainer}>
        <View style={{ marginLeft: scale(24) }}>
          <Text style={styles.emailTitleText}>Enter your email</Text>
        </View>
        <TextInput
          style={{
            marginTop: verticalScale(22),
            height: verticalScale(48),
            width: '88%',
            alignSelf: 'center',
            borderWidth: moderateScale(1),
            borderColor: COLORS.gainsboro,
            borderRadius: moderateScale(10),
          }}
        />
      </View>
    </RBSheet>
  )
})

export default SignUpWithEmail

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: verticalScale(24),
  },
  containerStyle: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  emailTitleText: {
    fontFamily: FONTS.quicksand,
    fontSize: moderateScale(20),
    color: COLORS.achromaticBlack,
    fontWeight: '700',
  },
})
