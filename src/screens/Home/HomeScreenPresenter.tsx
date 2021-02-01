import React  from 'react'
import {Container, Title} from '@components/Container'
import styled from "styled-components/native";
import {COLORS} from "@const";

const Wrapper = styled.ScrollView`
  flex: 1
  marginVertical: 8px
`
const Box = styled.TouchableOpacity`
  backgroundColor: transparent
  height: 240px
  marginVertical: 8px
  marginHorizontal: 16px
  borderWidth: 4px
  borderColor: ${COLORS.primary}
  borderRadius: 25px
  paddingVertical: 16px
  paddingHorizontal: 16px
`
const MOCK = ['Farmaciauno \nbox 1',  'Farmaciauno \nbox 2']
export const HomeScreenPresenter: React.FC = ({
}) => (
  <Container tKey={'Homepage'}>
    <Wrapper>
      {MOCK.map((text) => <Box><Title color={COLORS.primary}>{text}</Title></Box>)}
    </Wrapper>
  </Container>
)
