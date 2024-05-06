import React from 'react'
import { StyleSheet } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const BottomSheet = React.forwardRef(({ children, onClose }, ref) => {
  return (
    <RBSheet
      closeOnDragDown
      customStyles={{
        container: styles.containerStyle,
      }}
      height={verticalScale(450)}
      keyboardAvoidingViewEnabled
      onClose={onClose}
      ref={ref}
    >
      {children}
    </RBSheet>
  )
})

export default BottomSheet

const styles = StyleSheet.create({
  containerStyle: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
})
