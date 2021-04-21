import React, { useCallback, useMemo } from 'react'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { Button } from '@components/Button'
import { H3, TinyText } from '@components/Text'
import { COLORS } from '@const'
import { MODAL_NAMES, SCREEN_NAMES } from '@const/navigation'
import { ORDER_APPROVED, ORDER_REJECTED } from '@const/order'
import { selectHasQuestionnaire } from '@redux/modules/auth'
import { selectBrandsByIds } from '@redux/modules/brands'
import { selectCategoriesById } from '@redux/modules/categories'
import { selectOrderByBoxId } from '@redux/modules/orders'

export const BoxTile = ({ box }) => {
  const { navigate } = useNavigation()
  const { name, id, left, imageUrl, categories, brands } = box
  const categoriesData = useSelector(selectCategoriesById(categories))
  const brandsData = useSelector(selectBrandsByIds(brands))
  const order = useSelector(selectOrderByBoxId(id))
  const navigateToQuestionnaire = () => navigate(MODAL_NAMES.FillQuestionnaire)
  const navigateToProductSelection = () => navigate({ params: { boxId: id }, routeName: SCREEN_NAMES.ProductSelection })
  const hasQuestionnaire = useSelector(selectHasQuestionnaire)
  const approved = order?.status === ORDER_APPROVED
  const rejected = order?.status === ORDER_REJECTED
  const buttonOnPress = useCallback(() => {
    if (approved) {
      const fn = hasQuestionnaire ? navigateToProductSelection : navigateToQuestionnaire
      fn()
    } else {
      // TODO
    }
  }, [approved, hasQuestionnaire])

  const buttonTKey = useMemo(() => {
    if (approved) {
      return hasQuestionnaire ? 'box.chooseExtra' : 'questionnaire.fill'
    } else {
      return 'contactUs'
    }
  }, [hasQuestionnaire, rejected, approved])
  console.log(imageUrl)
  return (
    <Wrapper
      key={id}
      onPress={() => {
        navigate({ params: { boxId: id }, routeName: MODAL_NAMES.Box })
      }}
    >
      <Top>
        <Title translations={name} />
        <Label tKey={order ? 'home.boxStatus' : 'home.availableBoxes'} />
        <Values>{order ? order.status : left}</Values>
      </Top>
      <Bottom>
        <ItemsImage resizeMode={'contain'} source={{ uri: imageUrl }} />
        {rejected || approved ? (
          <StyledButton onPress={buttonOnPress} tKey={buttonTKey} />
        ) : (
          <>
            <Row>
              <Label tKey={'home.topic'} />
              {categoriesData.map((category) => (
                <Value key={category.id} translations={category.name} />
              ))}
            </Row>
            <Brands horizontal>
              {brandsData.map((brand) => (
                <BrandImageWrapper key={brand.id}>
                  <BrandImage source={{ uri: brand.imageDarkUrl }} />
                </BrandImageWrapper>
              ))}
            </Brands>
          </>
        )}
      </Bottom>
    </Wrapper>
  )
}

const StyledButton = styled(Button)`
  margin-bottom: 0;
  width: 50%;
`
const Wrapper = styled.TouchableOpacity`
  border-color: ${COLORS.tertiary};
  border-radius: 20px;
  border-width: 3px;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;
`
const Row = styled.View`
  flex-direction: row;
  margin-top: 4px;
`
const Top = styled.View`
  border-radius: 20px;
  justify-content: center;

  padding: 18px 24px;
`
const Bottom = styled.View`
  background-color: ${COLORS.tertiary};
  border-radius: 16px;
  justify-content: center;
  min-height: 102px;
  padding: 24px;
  width: 100%;
`
const Label = styled(TinyText)`
  color: ${COLORS.primaryDark};
  margin-right: 4px;
`
const Values = styled(TinyText).attrs({ numberOfLines: 1 })`
  flex: 1;
  color: ${COLORS.achromaticBlack};
`
const Value = styled(TinyText)`
  margin-right: 2px;
`
const Title = styled(H3)`
  margin-bottom: 8px;
`
const Brands = styled.ScrollView`
  margin-top: 10px;
`
const BrandImageWrapper = styled.View`
  background-color: ${COLORS.veryLight};
  border-radius: 10px;
  height: 30px;
  margin-right: 8px;
  width: 55px;
`
const BrandImage = styled(FastImage)`
  flex: 1;
`
const ItemsImage = styled(FastImage)`
  bottom: 70px;
  height: 112px;
  position: absolute;
  right: 0;
  width: 160px;
`
