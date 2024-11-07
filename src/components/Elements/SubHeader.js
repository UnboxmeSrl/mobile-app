import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AppText from './AppText';
import {colors, perfectSize} from '../../utils';
import {verticalScale} from 'react-native-size-matters';

const SubHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" style={styles.icon} />
      </TouchableOpacity>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.item} />
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(24),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
    backgroundColor: colors.white,
  },
  item: {
    height: '100%',
    width: perfectSize(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: perfectSize(18),
    fontWeight: '700',
    // fontFamily: fonts.inter700,
    color: colors.dark,
  },
  icon: {
    fontSize: perfectSize(28),
    color: colors.dark,
  },
});
