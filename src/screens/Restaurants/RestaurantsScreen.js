import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { FONTS } from '../../constants/fonts'
import { COLORS } from '../../constants/colors'
import { IMAGES } from '../../assets/images'
import { Categories } from '@components/Categories'
import { useSelector } from 'react-redux'
import { selectPrizeAwardsByCategory, selectPrizeCategoriesIds } from '@redux/modules/awards'
import { _awardCategory, _awardPrizeCategory, selectAwardPrizeCategory, setAppData } from '@redux/modules/app'
import { navigate } from '@services'
import { SCREEN_NAMES } from '../../constants/navigation'
const RestaurantsScreen = () => {

  const categoriesIds = useSelector(selectPrizeCategoriesIds)
  const category = useSelector(selectAwardPrizeCategory)

  const listData = [
    {
      name: 'Waroeng Bernadette Seminyak',
      distance: '23 km',
      forModal: true,
      expirence: 250,
      image: require('../../assets/some-of-our-dishes-in.jpg')
    },
    {
      name: 'Waroeng Bernadette Ubud',
      distance: '23 km',
      forModal: true,
      expirence: 250,
      image: require('../../assets/waroeng-bernadette(3).jpg')
    },
    {
      name: 'Lazy Cats Café',
      distance: '23 km',
      forModal: true,
      expirence: 250,
      image: require('../../assets/1282798005592e62360cb91_14715530_1248638668510845_3736823711373637001_o.jpg')
    },
    {
      name: 'Hubble Bali',
      distance: '23 km',
      forModal: true,
      expirence: 250,
      image: require('../../assets/image7.png')
    },
  ]

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={()=>{
        navigate(SCREEN_NAMES.RestaurantDetails)
      }}>
        <ImageBackground source={item.image} style={styles.itemImage} resizeMode='cover'>
          <View style={{ width: '100%', flexDirection: 'row-reverse' }}>
            <View style={{ paddingVertical: 7, paddingHorizontal: 20, backgroundColor: '#DADADA', borderRadius: 20, marginRight: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 12, color: COLORS.white }}>+250</Text>
              <Image source={IMAGES.ratingStar} resizeMode='contain' style={{ height: 12, width: 12, marginLeft: 2 }} />
            </View>
            <View style={{ paddingVertical: 7, paddingHorizontal: 20, backgroundColor: '#DADADA', borderRadius: 20, marginRight: 5, marginTop: 10 }}>
              <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 12, color: COLORS.white }}>For modal</Text>
            </View>
          </View>
          <View style={{position:'absolute', bottom:20, left: 10,}}>
            <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 15, color: COLORS.white }}>{item.name}</Text>
            <Text style={{ fontFamily: FONTS.quicksandMedium, fontSize: 12, color: COLORS.white }}>{item.distance} from here</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.selectedLocation}>
        <Image
          source={IMAGES.location}
          resizeMode="contain"
          style={styles.locationIcon}
        />
        <Text style={styles.locationfont}>Bali</Text>
      </TouchableOpacity>
      <Categories categoriesIds={categoriesIds} category={category} onPress={() => { }} />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <FlatList
          data={listData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          contentContainerStyle={styles.listMain}
        />
      </View>
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  selectedLocation: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    paddingHorizontal: 25,
    paddingVertical: 3
  },
  locationfont: {
    fontFamily: FONTS.quicksandBold,
    fontSize: moderateScale(20),
  },
  locationIcon: {
    height: 18,
    width: 18,
    marginRight: 10
  },
  listItem: {
    height: 226,
    marginBottom: 20
  },
  itemImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
})
