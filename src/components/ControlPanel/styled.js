import styled from 'styled-components'

export const ControlPanel = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

export const ControlPanelGridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
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
  /* width: 100% */
`

export const ControlPanelHeading = styled.span`
  font-size: 13px;
  text-align: center;
`

export const ControlPanelButton = styled.button`
  flex-grow: 1;
  max-width: 110px;
`

export const ControlPanelSelect = styled.select`
  flex-grow: 1;
  max-width: 110px;
`