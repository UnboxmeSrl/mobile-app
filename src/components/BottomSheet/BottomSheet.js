import React from 'react';
import {StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

const BottomSheet = React.forwardRef(
  ({children, onClose, onOpen, height = verticalScale(450)}, ref) => {
    return (
      <RBSheet
        onOpen={onOpen}
        closeOnDragDown
        customStyles={{
          container: styles.containerStyle,
        }}
        height={height}
        keyboardAvoidingViewEnabled
        onClose={onClose}
        ref={ref}>
        {children}
        <Toast ref={Toast.setRef} topOffset={50} />
      </RBSheet>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  containerStyle: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
});
