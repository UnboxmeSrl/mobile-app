import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import perfectSize from '../../utils/responsiveSize'
import { colors } from '../../utils/theme'
import AppText from './AppText'

function ReadMore({ desc }) {
  const [showFullText, setShowFullText] = useState(false)
  const handleReadMore = () => {
    setShowFullText(!showFullText)
  }
  return (
    <View style={styles.bioDescGrid}>
      <AppText style={styles.bioDesc} numberOfLines={showFullText ? undefined : 3} ellipsizeMode="tail">
        {desc}
      </AppText>
      <TouchableOpacity onPress={handleReadMore} style={styles.readMoreBtn}>
        <AppText style={styles.readMore}>{showFullText ? 'Read less' : 'Read more'}</AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bioDescGrid: {
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  bioDesc: {
    fontSize: perfectSize(15),
    // fontFamily: fonts.inter400,
    color: colors.info,
  },
  readMoreBtn: {
    alignSelf: 'flex-end',
  },
  readMore: {
    fontSize: perfectSize(16),
    fontWeight: '600',
    // fontFamily: fonts.inter600,
    color: colors.primary,
  },
})
export default ReadMore
