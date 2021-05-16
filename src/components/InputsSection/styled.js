import styled from 'styled-components'

export const InputsSection = styled.section`
  display: flex;
  flex-direction: row;
  padding: 0px 20px 20px 20px;
  background: #5f8999;
  max-height: 300px;
  overflow-y: scroll;
  min-width: 670px;

  @media(min-width: 930px) {
    max-height: 590px;
    padding: 20px 0 20px 20px;
  }
`