import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { generateRandomNumberString } from '../../core/helper'

import {
  Container,
  DropdownContent,
  ButtonDropdown,
  DropdownItem
} from './styles'

/*
optionsItems = [
    {title:string | React.Component},
    {action:()=>{}}
]
*/

const Dropdown = ({ optionsItems = [] }) => {
  const [active, setActive] = useState(false)

  return (
    <Container onClick={() => setActive(!active)}>
      <ButtonDropdown>
        <FaChevronDown />
      </ButtonDropdown>
      <DropdownContent active={active}>
        {optionsItems.map(o => {
          let randomNumberString = generateRandomNumberString()
          return (
            <DropdownItem key={randomNumberString} onClick={o.action}>
              {o.title}
            </DropdownItem>
          )
        })}
      </DropdownContent>
    </Container>
  )
}

export default Dropdown
