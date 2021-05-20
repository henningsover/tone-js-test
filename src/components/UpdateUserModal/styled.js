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

export const AuthLabel = styled.label`
  font-size: 13px;
  margin-bottom: 5px;
`

export const AuthInput = styled.input`
  margin-bottom: 20px;
  padding: 5px;
  font-size: 10px;
  border-style: none;
  border: 1px solid #b7b5b5;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px #070b42;
    border-radius: 2px;
    border-color: #070b42
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