import React from 'react'
import styled from 'styled-components/native'

import { ModalContainer } from '@components/ModalContainer'
import { BodyText, ButtonText, H3 } from '@components/Text'
import { COLORS } from '@const'

export const TimeslotsPresenter = ({ title }) => (
  <ModalContainer contentBased forceSmall>
    <Content>
      <Row>
        <Title tKey={title || 'awards.availableTimeslots'} />
      </Row>
      <Table>
        <TableHours>
          <TableRow>
            <BodyText>8am - 1pm</BodyText>
          </TableRow>
          <TableRow>
            <BodyText>8am - 1pm</BodyText>
          </TableRow>
          <TableRow>
            <BodyText>1am - 5pm</BodyText>
          </TableRow>
          <TableRow>
            <BodyText>5pm - 9pm</BodyText>
          </TableRow>
        </TableHours>
        <TableData>
          <TableRow>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item) => (
              <TableItem>
                <ButtonText>{item}</ButtonText>
              </TableItem>
            ))}
          </TableRow>
          <TableRow>
            {['X', 'X', 'X', 'X', 'X', 'V', 'V'].map((item) => (
              <TableItem>
                {item === 'V' ? (
                  <ButtonText style={{ color: COLORS.success }}>{item}</ButtonText>
                ) : (
                  <BodyText>{item}</BodyText>
                )}
              </TableItem>
            ))}
          </TableRow>
          <TableRow>
            {['V', 'V', 'V', 'V', 'V', 'V', 'V'].map((item) => (
              <TableItem>
                {item === 'V' ? (
                  <ButtonText style={{ color: COLORS.success }}>{item}</ButtonText>
                ) : (
                  <BodyText>{item}</BodyText>
                )}
              </TableItem>
            ))}
          </TableRow>
          <TableRow>
            {['X', 'X', 'X', 'X', 'X', 'X', 'X'].map((item) => (
              <TableItem>
                {item === 'V' ? (
                  <ButtonText style={{ color: COLORS.success }}>{item}</ButtonText>
                ) : (
                  <BodyText>{item}</BodyText>
                )}
              </TableItem>
            ))}
          </TableRow>
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
  flex: 0.7;
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
  height: 40px;
  justify-content: center;
  width: 40px;
`
