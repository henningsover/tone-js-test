import styled from 'styled-components'

export const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #5f8999;
  overflow: scroll;
  border: 1px solid black;

  @media(min-width: 930px) {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlaybackMasterRow = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  display: flex;
  flex-direction: row;

  @media(min-width: 930px) {
    grid-row-start: unset;
    grid-column-start: unset;
    flex-direction: column;
  }

  @media(min-width: 1010px) {
    flex-direction: row;
  }
`

export const PlaybackContainer = styled.div`
  display: grid;
  gap: 10px;
  border: 1px solid;
  padding: 20px;
  width: 50%;
  min-width: 200px;

  @media(min-width:930px) {
    width: unset;
  }

  @media(min-width: 1115px) {
    min-width: unset;
    width: 50%;
  }
`

export const ControlPanelGridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const ControlPanelCol = styled.div`
  display:flex;
  flex-direction: column;
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.5em 0;
`

export const ControlPanelInput = styled.input`
  width: 200px;
  height: 20px;
  font-size: 10px;

  @media(min-width: 1100px) {
    width: 100%;
  }
`

export const ControlPanelHeading = styled.span`
  font-size: 10px;
  text-align: center;
  margin-bottom: 1em;

  @media(min-width: 1115px) {
    font-size: 13px;
  }
`

export const ControlPanelButton = styled.button`
  flex-grow: 1;
  max-width: 80px;
  min-width: 80px;

  @media(min-width: 930px) {
    padding: 5px 0;
  }

  @media(min-width: 1115px) {
    min-width: unset;
  }
`

export const ButtonSmall = styled.button`
  margin: 0 5px;
  padding: 0 10px;
`

export const ControlPanelSelect = styled.select`
  width: 200px;
  height: 100%;

  @media(min-width: 1100px) {
    width: 100%;
  }
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 50%;
`
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonsWrapper = styled(FlexCol)`
  width: 200px;

  @media(min-width:1100px) {
    width: 50%;
    padding: 0 20px;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`


export const FlexColContainer = styled(FlexCol)`
  padding: 20px 0px;
  border: 1px solid black;
  flex-grow: 1;
`

export const GridInternal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media(min-width: 1100px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const BpmOctaveWrapper = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  grid-row-start: 1;
  grid-column-start: 2;
  height: 100%;

  @media(min-width: 930px) {
    grid-row-start: unset
  }

  @media(min-width: 1100px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const ControlPanelLabel = styled.span`
  font-size: 10px;
`

export const InputWrapper = styled.div`
  width: unset;
  margin-bottom: 20px;


  @media(min-width: 1100px) {
    width: 50%;
    margin-right: 10px;
    padding-left: 20px;
  }
`

export const TopRow = styled.div`
  padding: 20px;
  border: 1px solid black;
  flex-grow: 1;
`

