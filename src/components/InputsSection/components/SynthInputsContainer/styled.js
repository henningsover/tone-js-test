import styled from 'styled-components'

export const SynthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #5f8999;
  background-color: black;
`

export const SynthInputRow = styled.div`
  display: flex;
  flex-grow: 1;
`

export const SynthInput = styled.input`
  width: 50px;
  max-width: 50px;
  border-radius: 0px;
  border: 0;
  height: 100%;
  padding: 2px 0px;
  background-color: black;
  text-align: center;
  font-size: 10px;
`

export const NoteInput = styled(SynthInput)`
  color: yellow;
  border-bottom: 1px dotted yellow;
`

export const IntrumentInput = styled(SynthInput)`
  color: #5fe1f7;
  border-bottom: 1px dotted #5fe1f7;
  width: 30px;
`

export const EffectInput = styled(SynthInput)`
  color: lime;
  border-bottom: 1px dotted lime;
  width: 30px;
`

export const EffectValInput = styled(SynthInput)`
  color: orange;
  border-bottom: 1px dotted orange
`