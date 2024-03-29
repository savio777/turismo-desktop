import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from '../../components/Spinner'
import api from '../../core/api'
import { Container, FormBox, Divider } from './styles'
import { Input, ButtonPrincipal } from '../../styles'

export default function Login() {
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      setLoading(true)

      const response = await api
        .post('sessions', {
          email,
          password
        })
        .finally(() => setLoading(false))

      history.push('/costumers')
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <Container>
      <Spinner loading={loading} />

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
