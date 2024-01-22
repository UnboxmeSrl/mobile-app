import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground, ScrollView } from 'react-native'
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
const RestaurantDetails = () => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View>
                    <Image
                        source={require('../../assets/some-of-our-dishes-in.jpg')}
                        resizeMode='cover'
                        style={{ height: 200, width: '100%', }}
                    />
                    <Image
                        source={IMAGES.back}
                        resizeMode='cover'
                        style={{ height: 30, width: 30, position: 'absolute', top: 20, left: 20, }}
                    />
                </View>
                <View style={{paddingHorizontal:15}}>
                    <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 20, color: COLORS.achromaticBlack, marginTop:10 }}>Waroeng Bernadette Seminyak</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop:20}}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{height:50, width: 50, borderRadius:25, backgroundColor: COLORS.lightPink, justifyContent: 'center',alignItems: 'center',}}>
                            <Image
                                source={IMAGES.tiktokNew}
                                resizeMode='contain'
                                style={{height:20,width: 20,}}                            
                            />
                            </View>
                            <Text style={{ fontFamily: FONTS.quicksandMedium, fontSize: 12, color: COLORS.primary, marginTop:10 }}>TikTok</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{height:50, width: 50, borderRadius:25, backgroundColor: COLORS.lightPink, justifyContent: 'center',alignItems: 'center',}}>
                            <Image
                                source={IMAGES.insta}
                                resizeMode='contain'
                                style={{height:20,width: 20,}}                            
                            />
                            </View>
                            <Text style={{ fontFamily: FONTS.quicksandMedium, fontSize: 12, color: COLORS.primary, marginTop:10 }}>Instagram</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{height:50, width: 50, borderRadius:25, backgroundColor: COLORS.lightPink, justifyContent: 'center',alignItems: 'center',}}>
                            <Image
                                source={IMAGES.internet}
                                resizeMode='contain'
                                style={{height:20,width: 20,}}                            
                            />
                            </View>
                            <Text style={{ fontFamily: FONTS.quicksandMedium, fontSize: 12, color: COLORS.primary, marginTop:10 }}>Website</Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 20, color: COLORS.achromaticBlack, marginTop:10 }}>About</Text>
                    <Text style={{ fontFamily: FONTS.quicksand, fontSize: 14, color: COLORS.greyFont, marginTop:3 }}>The motel is located in the most popular tourist area in Bali. We’ll bring you through some of the most.</Text>
                    <Text style={{ fontFamily: FONTS.quicksandBold, fontSize: 14, color: COLORS.primary, marginTop:3 }}>5 spots are lefts for other influencers this week</Text>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: getStatusBarHeight(),
    },
})

export default RestaurantDetails