import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import {COLORS} from '../../constants';
import {perfectSize} from '../../utils';

function ReadMore({desc}) {
  const [showFullText, setShowFullText] = useState(false);
  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };
  return (
    <View style={styles.bioDescGrid}>
      <AppText
        ellipsizeMode="tail"
        numberOfLines={showFullText ? undefined : 3}
        style={styles.bioDesc}>
        {desc}
      </AppText>
      <TouchableOpacity onPress={handleReadMore} style={styles.readMoreBtn}>
        <AppText style={styles.readMore}>
          {showFullText ? 'Read less' : 'Read more'}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bioDesc: {
    // fontFamily: fonts.inter400,
    color: COLORS.davyGrey,
    fontSize: perfectSize(15),
  },
  bioDescGrid: {
    alignItems: 'baseline',
    flexDirection: 'column',
  },
  readMore: {
    // fontFamily: fonts.inter600,
    color: COLORS.celticBlue,
    fontSize: perfectSize(16),
    fontWeight: '600',
  },
  readMoreBtn: {
    alignSelf: 'flex-end',
  },
});
export default ReadMore;
