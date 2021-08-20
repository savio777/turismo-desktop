import React from 'react'

import { Container, FormBox, Divider } from './styles'
import { Input, ButtonPrincipal } from '../../styles'

export default function Login() {
  return (
    <Container>
      <FormBox>
        <h1>Guilhon Turismo</h1>
        <Divider />
        <Input placeholder="email" type="email" />
        <Input placeholder="senha" type="password" />
        <ButtonPrincipal>logar</ButtonPrincipal>
      </FormBox>
    </Container>
  )
}
