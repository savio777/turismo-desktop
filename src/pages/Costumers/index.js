import React, { useEffect, useState } from 'react'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

import Dropdown from '../../components/Dropdown'
import api from '../../core/api'
import { Container, Title } from './styles'
import { ButtonPrincipal } from '../../styles'

export default function Dashboard() {
  const [costumers, setCostumers] = useState([])

  const [optionDropDown] = useState([
    { title: <FaEye />, action: () => alert('detalhes') },
    { title: <FaEdit />, action: () => alert('editar') },
    { title: <FaTrash color={'red'} />, action: () => alert('excluir') }
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
      <Title>Clientes</Title>
      <ButtonPrincipal onClick={() => alert('modal cadastrar cliente')}>
        <FaPlus style={{ marginRight: 5 }} />
        Cadastrar Cliente
      </ButtonPrincipal>

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
