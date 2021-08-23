import React, { useEffect, useState } from 'react'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import api from '../../core/api'
import { Container, Title } from './styles'
import { ButtonPrincipal, Input, Label } from '../../styles'

export default function Dashboard() {
  const [openModalCreateCostumer, setOpenModalCreateCostumer] = useState(false)
  const [costumers, setCostumers] = useState([])

  // create | edit
  const [selectedModalCreateEditCostumer, setSelectedModalCreateEditCostumer] =
    useState('create')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [RG, setRG] = useState('')
  const [CPF, setCPF] = useState('')
  const [address, setAddress] = useState('')
  const [nameMother, setNameMother] = useState('')

  /*
  {
    "name": string,
    "phone": string,
    "rg": string,
    "cpf": string,
    "address": string,
    "name_mother": string
  }
  */
  const [costumerEdit, setCostumerEdit] = useState({})

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

  const closeModalModalCreateEditCostumer = () => {
    setOpenModalCreateCostumer(false)

    setName('')
    setPhone('')
    setCPF('')
    setRG('')
    setAddress('')
    setNameMother('')
    setCostumerEdit({})
  }

  const createCostumer = async () => {
    try {
      const response = await api.post('customers', {
        name,
        phone,
        rg: RG,
        cpf: CPF,
        address,
        name_mother: nameMother
      })

      console.log(response.data)

      // quando a api tiver pronta vai mostrar a mensagem
      // de resposta e a verificação se algum campo
      // ficou vazia será feita pela api e codigo de erro
      toast.success('Cadastrado com sucesso!')

      closeModalModalCreateEditCostumer()
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const editCostumer = async () => {
    try {
      const response = await api.put(`customers/${costumerEdit?.id}`, {
        name,
        phone,
        rg: RG,
        cpf: CPF,
        address,
        name_mother: nameMother
      })

      // quando a api tiver pronta vai mostrar a mensagem
      // de resposta e a verificação se algum campo
      // ficou vazia será feita pela api e codigo de erro
      toast.success('Cliente salvo com sucesso!')

      closeModalModalCreateEditCostumer()
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const modalCreateEditCostumer = () => (
    <Modal
      open={openModalCreateCostumer}
      close={closeModalModalCreateEditCostumer}
      title={
        selectedModalCreateEditCostumer === 'edit'
          ? 'Editar cliente'
          : 'Cadastro de clientes'
      }
    >
      <Label>Nome</Label>
      <Input value={name} onChange={event => setName(event.target.value)} />
      <Label>Telefone</Label>
      <Input value={phone} onChange={event => setPhone(event.target.value)} />
      <Label>CPF</Label>
      <Input value={CPF} onChange={event => setCPF(event.target.value)} />
      <Label>RG</Label>
      <Input value={RG} onChange={event => setRG(event.target.value)} />
      <Label>Endereço</Label>
      <Input
        value={address}
        onChange={event => setAddress(event.target.value)}
      />
      <Label>Nome da mãe</Label>
      <Input
        value={nameMother}
        onChange={event => setNameMother(event.target.value)}
      />
      <ButtonPrincipal
        style={{ marginTop: 10 }}
        onClick={() =>
          selectedModalCreateEditCostumer === 'edit'
            ? editCostumer()
            : createCostumer()
        }
      >
        {selectedModalCreateEditCostumer === 'edit'
          ? 'Salvar edição'
          : 'Salvar cadastro'}
      </ButtonPrincipal>
    </Modal>
  )

  return (
    <>
      {modalCreateEditCostumer()}
      <Container>
        <Title>Clientes</Title>
        <ButtonPrincipal
          onClick={() => {
            setSelectedModalCreateEditCostumer('create')
            setOpenModalCreateCostumer(true)
          }}
        >
          <FaPlus style={{ marginRight: 5 }} />
          Cadastrar Cliente
        </ButtonPrincipal>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>CPF</th>
            </tr>
            {costumers.map(c => (
              <tr key={c.id}>
                <td>
                  <Dropdown optionsItems={optionDropDown} />
                </td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  )
}
