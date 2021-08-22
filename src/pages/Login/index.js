import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import sha256 from 'sha256'

import api from '../../core/api'
import { Container, FormBox, Divider } from './styles'
import { Input, ButtonPrincipal } from '../../styles'

export default function Login() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      /*const response = await api.post('users', { usuario: email, senha: sha256(password) })
      if(response.status === 200)*/

      history.push('/costumers')
    } catch (error) {
      console.log(error)
    }
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
