import styled from 'styled-components'

import { colors } from '../../core/helper'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;

  padding: 40px;
  align-items: center;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`

export const Title = styled.h2`
  color: ${colors.primary};
  font-style: italic;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`
