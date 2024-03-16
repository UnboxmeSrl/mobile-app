import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

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
      <AppText ellipsizeMode="tail" numberOfLines={showFullText ? undefined : 3} style={styles.bioDesc}>
        {desc}
      </AppText>
      <TouchableOpacity onPress={handleReadMore} style={styles.readMoreBtn}>
        <AppText style={styles.readMore}>{showFullText ? 'Read less' : 'Read more'}</AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bioDesc: {
    // fontFamily: fonts.inter400,
    color: colors.info,

    fontSize: perfectSize(15),
  },
  bioDescGrid: {
    alignItems: 'baseline',
    flexDirection: 'column',
  },
  readMore: {
    // fontFamily: fonts.inter600,
    color: colors.primary,

    fontSize: perfectSize(16),

    fontWeight: '600',
  },
  readMoreBtn: {
    alignSelf: 'flex-end',
  },
})
export default ReadMore
