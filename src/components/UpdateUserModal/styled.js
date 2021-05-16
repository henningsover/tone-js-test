import styled from 'styled-components'

export const Header = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: #5f8999;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

export const Heading = styled.h2`
  padding: 5px;
  font-size: 20px;
  color: aliceblue;
`

export const SubmitButton = styled.button`
  padding: 5px;
  background: #5f8999;
  border: none;
  color: aliceblue;

  &:hover {
    background-color: #385460;
    cursor: pointer;
  }
`

export const FormWrapper = styled.div`
  width: 100%;
  padding: 20px;
`

export const AuthForm = styled.form `
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const AuthInput = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  font-size: 10px;
  outline: none;

  &:focus {
    outline: none;
  }
`

export const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 10px;
`

export const Msg = styled.span`
  color: green;
  margin-bottom: 10px;
`