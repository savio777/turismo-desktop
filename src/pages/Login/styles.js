import styled from 'styled-components'

import { colors } from '../../core/helper'

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;

  align-items: center;
  justify-content: center;
`

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  border: 0.5px solid #ccc;
  border-radius: 10px;

  h1 {
    font-style: italic;
  }

  input {
    margin-top: 20px;
  }
  button {
    margin-top: 20px;
  }
`

export const Divider = styled.div`
  background-color: ${colors.primary};
  border: 2.5px solid ${colors.primary};
  border-radius: 5px;
  width: 100%;
`
