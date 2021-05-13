import styled from 'styled-components'

export const SynthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: black;
`

export const SynthInputRow = styled.div`
  display: flex;
`

export const SynthInput = styled.input`
  width: 50px;
  max-width: 50px;
  border-radius: 0px;
  border: 0;
  height: 100%;
  padding-left: 2px;
  background-color: black;
  text-align: center;
`

export const NoteInput = styled(SynthInput)`
  color: yellow;
  border-bottom: 1px dotted yellow;
`

export const IntrumentInput = styled(SynthInput)`
  color: #5fe1f7;
  border-bottom: 1px dotted #5fe1f7;
`

export const EffectInput = styled(SynthInput)`
  color: lime;
  border-bottom: 1px dotted lime;
`

export const EffectValInput = styled(SynthInput)`
  color: orange;
  border-bottom: 1px dotted orange
`