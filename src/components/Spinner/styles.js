import styled, { css } from 'styled-components'

import { colors } from '../../core/helper'

export const override = css`
  display: block;
  margin: 0 auto;
  border-color: ${colors.primary};
`

export const Container = styled.div`
  display: ${props => (props.active ? 'flex' : 'none')}; /* Hidden by default */
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */

  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.2); /* Black w/ opacity */
`
