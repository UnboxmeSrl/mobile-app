import React from 'react'
import Carousel from 'react-native-snap-carousel';
import {Container, Title} from '@components/Container'
import {SectionTitle} from "@components/Text";
import styled from "styled-components/native";
import {ImageBackground, useWindowDimensions} from "react-native";
import BaseGradient from "@components/BaseGradient";

const WIDTH = 240
const HEIGHT = 120

const Box = styled.TouchableOpacity`
  width: ${WIDTH}px
  height: ${HEIGHT}px
  marginHorizontal: 8px
`

const Box2 = styled(Box)`
  width: auto
  marginBottom: 16px
  paddingRight: 8px

`
const Wrapper = styled.View`
  marginBottom: 16px;
`
const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingLeft: 8,
    paddingRight: 0,
  }
})``

const MOCK1 = [{title: 'Savini', image:'https://picsum.photos/200/300?random=1'}, {title: 'Ilovepoke', image:'https://picsum.photos/200/300?random=2'}]
const MOCK2 = [{title: 'Hell\'s kitchen', image:'https://picsum.photos/200/300?random=3'}, {title: 'Dunkin\' Donuts', image:'https://picsum.photos/200/300?random=4'}]

const renderItem = ({item, index}) => {
  return (
    <Box key={item.title}>
      <ImageBackground source={{uri: item.image}} style={{flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
      }}  imageStyle={{ borderRadius: 8}}
      >
        <BaseGradient />
        <Title style={{marginLeft: 16, marginBottom: 8}}>{item.title}</Title>
      </ImageBackground>
    </Box>
  );
}
const renderItem2 = ({item, index}) => {
  return (
    <Box2 key={item.title}>
      <ImageBackground source={{uri: item.image}} style={{flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
      }}  imageStyle={{ borderRadius: 8}}
      >
        <BaseGradient />
        <Title style={{marginLeft: 16, marginBottom: 8}}>{item.title}</Title>
      </ImageBackground>
    </Box2>
  );
}

export const AwardsScreenPresenter: React.FC = ({}) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <Container tKey={'awards.title'}>
      <Wrapper>
      <SectionTitle tKey={'awards.weeklyInMilan'} />
      <List data={MOCK1} renderItem={renderItem} horizontal/>
      </Wrapper>
      <Wrapper>
        <SectionTitle tKey={'awards.weeklyInMilan'} />
        <List data={MOCK2} renderItem={renderItem} horizontal/>
      </Wrapper>
      <Wrapper>
        <SectionTitle tKey={'awards.specialAwards'} />
        <List data={MOCK2} renderItem={renderItem2}/>
      </Wrapper>
    </Container>
  )
}
