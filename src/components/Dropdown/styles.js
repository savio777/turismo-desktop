import styled from 'styled-components'
import { colors } from '../../core/helper'

export const Container = styled.div`
  position: relative;
  display: inline-block;
`

export const DropdownContent = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

export const DropdownItem = styled.button`
  text-align: left;
  width: 100%;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
`

export const ButtonDropdown = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 5px;
  font-size: 12px;
  border: none;
  cursor: pointer;
`
