import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../core/api'
import { Container, FormBox, Divider } from './styles'
import { Input, ButtonPrincipal } from '../../styles'

export default function Login() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      history.push('/costumers')
    } catch (error) {
      toast.error('Email ou senha errada')
    }
  }

  return (
    <Container>
      <FormBox>
        <h1>Guilhon Turismo</h1>
        <Divider />
        <Input
          full
          placeholder="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          full
          placeholder="senha"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <ButtonPrincipal full onClick={signIn}>
          logar
        </ButtonPrincipal>
      </FormBox>
    </Container>
  )
}
