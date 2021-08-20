import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, FormBox, Divider } from './styles'
import { Input, ButtonPrincipal } from '../../styles'

export default function Login() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = () => {
    console.log(email, password)

    history.push('/dashboard')
  }

  return (
    <Container>
      <FormBox>
        <h1>Guilhon Turismo</h1>
        <Divider />
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          placeholder="senha"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <ButtonPrincipal onClick={signIn}>logar</ButtonPrincipal>
      </FormBox>
    </Container>
  )
}
