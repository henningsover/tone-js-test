import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
  }

  li, ul {
    list-style: none;
  }

  button, span, p{
    font-size: 10px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  a:focus,
  button:focus,
  input:focus,
  :focus {
    outline: none;
  }

  a::-moz-focus-inner,
  button::-moz-focus-inner,
  input::-moz-focus-inner,
  ::-moz-focus-inner {
    border: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .current-pattern {
  background-color: #292a42;
}

.current-pattern input {
  background-color: #292a42;
}
`;
