import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

import { colors } from './core/helper'

const GlobalStyle = createGlobalStyle`
 *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }
    body{
      background: #fff;
      color: #000;
      -webkit-font-smoothing: antialiased;
    }
    body, input, button{
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
    }
    h1, h2, h3, h4, h5, h6, strong{
      font-weight: 500;
    }
    button{
      border: 0;
      cursor: pointer;
    }
`

export const Label = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
`

export const Input = styled.input`
  width: ${props => (props.full ? '100%' : '60%')};
  border: 0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  font-size: 12px;
`

export const ButtonPrincipal = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  width: ${props => (props.full ? '80%' : '30%')};
  padding: 10px 5px 10px 5px;

  border-radius: 10px;
  background-color: ${colors.primary};
  color: #fff;
`

export default GlobalStyle
