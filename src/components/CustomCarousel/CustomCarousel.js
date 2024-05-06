import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS} from '../../constants';

const SLIDER_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CustomCarousel = ({data, Component}) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <View style={styles.headerCarouselContainer}>
      <Carousel
        data={data}
        inactiveSlideOpacity={0}
        inactiveSlideShift={0}
        itemWidth={ITEM_WIDTH}
        layout="default"
        layoutCardOffset={9}
        onSnapToItem={index => setIndex(index)}
        ref={isCarousel}
        renderItem={Component}
        sliderWidth={SLIDER_WIDTH}
        useScrollView={true}
      />
      <Pagination
        activeDotIndex={index}
        carouselRef={isCarousel}
        containerStyle={styles.headerDotContainer}
        dotColor={COLORS.white}
        dotStyle={styles.headerCarouselDotStyle}
        dotsLength={data?.length}
        inactiveDotColor={COLORS.veryLight04}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        tappableDots={true}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  headerCarouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCarouselDotStyle: {
    borderRadius: moderateScale(5),
    height: moderateScale(10),
    marginHorizontal: 0,
    width: moderateScale(10),
  },
  headerDotContainer: {
    marginTop: verticalScale(-50),
  },
});
