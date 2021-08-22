import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown'

import api from '../../core/api'
import { Container } from './styles'

export default function Dashboard() {
  const [costumers, setCostumers] = useState([])

  const [optionDropDown] = useState([
    { title: 'detalhes', action: () => alert('detalhes') },
    { title: 'editar', action: () => alert('editar') },
    { title: 'excluir', action: () => alert('excluir') }
  ])

  const getData = async () => {
    try {
      const response = await api.get('customers')

      setCostumers(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <table>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>CPF</th>
        </tr>
        {costumers.map(c => (
          <tr>
            <td>
              <Dropdown optionsItems={optionDropDown} />
            </td>
            <td>{c.name}</td>
            <td>{c.phone}</td>
            <td>{c.cpf}</td>
          </tr>
        ))}
      </table>
    </Container>
  )
}
