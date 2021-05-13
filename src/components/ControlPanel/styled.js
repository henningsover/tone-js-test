import styled from 'styled-components'

export const ControlPanel = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 20px;
  background: #950d0d;
  justify-content: space-between;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlaybackContainer = styled.div`
  display: grid;
  gap: 10px;
  border: 1px solid;
  padding: 20px;
  width: 50%;
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
  width: 100%;
  height: 20px;
  font-size: 10px;
`

export const ControlPanelHeading = styled.span`
  font-size: 13px;
  text-align: center;
  margin-bottom: 1em;
`

export const ControlPanelButton = styled.button`
  flex-grow: 1;
  max-width: 80px;
`

export const ButtonSmall = styled.button`
  margin: 0 5px;
  padding: 0 10px;
`

export const ControlPanelSelect = styled.select`
  width: 100%;
  height: 100%;
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
  width: 50%;
  padding: 0 20px;
`

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`


export const FlexColContainer = styled(FlexCol)`
  padding: 20px 0px;
  border: 1px solid black;
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
  align-items: flex-start;
`

export const ControlPanelLabel = styled.span`
  font-size: 10px;
`

export const InputWrapper = styled.div`
  width: 50%;
  margin-right: 10px;
  padding-left: 20px;
`

