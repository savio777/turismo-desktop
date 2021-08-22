import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

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
        {optionsItems.map(o => (
          <DropdownItem onClick={o.action}>{o.title}</DropdownItem>
        ))}
      </DropdownContent>
    </Container>
  )
}

export default Dropdown
