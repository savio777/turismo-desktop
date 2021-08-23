import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

import { ButtonClose, Container, ModalContainer } from './styles'

const Modal = ({ children, title = '', open = false, close = () => {} }) => {
  useEffect(() => {
    setActive(open)
  }, [open])

  const [active, setActive] = useState(false)

  return (
    <Container active={active}>
      <ModalContainer>
        <ButtonClose onClick={close}>
          <FaTimes color="#aaaaaa" />
        </ButtonClose>
        <h3>{title}</h3>
        {children}
      </ModalContainer>
    </Container>
  )
}

export default Modal
