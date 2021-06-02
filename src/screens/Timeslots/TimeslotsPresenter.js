import React from 'react'
import { defaultTo, keys, pipe, values } from 'ramda'
import styled from 'styled-components/native'

import { ModalContainer } from '@components/ModalContainer'
import { BodyText, ButtonText, H3 } from '@components/Text'
import { COLORS } from '@const'

export const TimeslotsPresenter = ({ title, timeslots = {} }) => (
  <ModalContainer contentBased forceSmall>
    <Content>
      <Row>
        <Title tKey={title || 'awards.availableTimeslots'} />
      </Row>
      <Table>
        <TableHours>
          <TableRow>
            <BodyText> </BodyText>
          </TableRow>
          {pipe(
            defaultTo([]),
            keys
          )(timeslots).map((key) => (
            <TableRow key={key}>
              <BodyText>{key}</BodyText>
            </TableRow>
          ))}
        </TableHours>
        <TableData>
          <TableRow>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item, index) => (
              <TableItem key={index}>
                <ButtonText>{item}</ButtonText>
              </TableItem>
            ))}
          </TableRow>
          {pipe(
            defaultTo([]),
            values
          )(timeslots).map((value, index) => (
            <TableRow key={index}>
              {value.map((item, index) => (
                <TableItem key={index}>
                  {item === 'V' ? (
                    <ButtonText style={{ color: COLORS.success }}>{item}</ButtonText>
                  ) : (
                    <BodyText>{item}</BodyText>
                  )}
                </TableItem>
              ))}
            </TableRow>
          ))}
        </TableData>
      </Table>
    </Content>
  </ModalContainer>
)

const Row = styled.View`
  margin-bottom: 20px;
`
const Content = styled.View`
  height: 240px;
  justify-content: space-around;
  padding-bottom: 20px;
  padding-horizontal: 20px;
`
const Title = styled(H3)`
  margin: 12px 0;
`
const TableHours = styled.View`
  flex: 0.2;
  padding-top: 8px;
`
const TableData = styled.ScrollView`
  flex: 0.8;
`
const Table = styled.View`
  flex-direction: row;
`
const TableRow = styled.View`
  flex-direction: row;
  height: 40px;
  justify-content: flex-start;
`
const TableItem = styled.View`
  align-items: center;
  flex: 1;
  height: 40px;
  justify-content: center;
`
