import styled from 'styled-components'

export const PageContainer = styled.main`
  display: flex;
  align-items: center;
  min-height: 100vh;
  background-color: #4d4de8;
`

export const Heading = styled.h1`
  margin-bottom: 30px;
  font-size: 15px;

  @media(min-width: 400px) {
    font-size: 20px;
  }
  @media(min-width: 650px) {
    font-size: 30px;
  }
`

export const AuthHeading = styled.h2`
  margin-bottom: 20px;
  letter-spacing: 5px;
  font-size: 15px;
`

export const AuthForm = styled.form `
  display: flex;
  flex-direction: column;
  width: 300px;
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

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0px;
  background: aliceblue;
  -webkit-box-shadow: 7px 6px 16px 0px #171555; 
  box-shadow: 7px 6px 16px 0px #171555;
`

export const ContentWrapper = styled.div`
  width: 100vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 650px) {
    width: 650px;
  }

`

export const SubmitButton = styled.button`
  padding: 5px;
  background: #4d4de8;
  border: none;
  color: aliceblue;

  &:hover {
    background-color: #2929ac;
    cursor: pointer;
  }
`

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: center;

  a {
    font-size: 10px;
    margin: 5px 0;
    color: aliceblue;
    text-decoration: none;

    &:hover {
      color: #f79670;
    }
  }
`