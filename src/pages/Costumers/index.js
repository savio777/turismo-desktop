import React, { useEffect, useState } from 'react'
import { FaEye, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import api from '../../core/api'
import { Container, Title, ContainerRow } from './styles'
import { ButtonPrincipal, Input, Label } from '../../styles'

export default function Dashboard() {
  const [costumers, setCostumers] = useState([])
  const [openModalDeleteCostumer, setOpenModalDeleteCostumer] = useState(false)
  const [openModalCreateCostumer, setOpenModalCreateCostumer] = useState(false)
  const [openModalDetailsCostumer, setOpenModalDetailsCostumer] =
    useState(false)
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
    setOpenModalDeleteCostumer(false)

    setName('')
    setPhone('')
    setCPF('')
    setRG('')
    setAddress('')
    setNameMother('')
    setCostumerEdit({})
  }

  const openModalDetails = async idCostumer => {
    try {
      const response = await api.get(`customers/${idCostumer}`)

      setCostumerEdit(response.data)
      setOpenModalDetailsCostumer(true)
    } catch (error) {
      console.log(error)
    }
  }

  const openModalEdit = async idCostumer => {
    try {
      const response = await api.get(`customers/${idCostumer}`)

      setCostumerEdit(response.data)
      setName(response.data.name)
      setPhone(response.data.phone)
      setCPF(response.data.cpf)
      setRG(response.data.rg)
      setAddress(response.data.address)
      setNameMother(response.data.name_mother)
      setOpenModalCreateCostumer(true)
      setSelectedModalCreateEditCostumer('edit')
    } catch (error) {
      console.log(error)
    }
  }

  const openModalExclude = async idCostumer => {
    try {
      const response = await api.get(`customers/${idCostumer}`)
      setCostumerEdit(response.data)
      setOpenModalDeleteCostumer(true)
    } catch (error) {
      console.log(error)
    }
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

  const deleteCostumer = async () => {
    try {
      const response = await api.delete(`customers/${costumerEdit?.id}`)

      toast.warn('Cliente deletado com sucesso!')

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

  const modalDeleteCostumer = () => (
    <Modal
      open={openModalDeleteCostumer}
      close={closeModalModalCreateEditCostumer}
      title="Deseja realmente excluir o cliente?"
    >
      <p style={{ marginTop: 10, marginBottom: 10 }}>
        Deseja deletar o cliente {costumerEdit?.name}?
      </p>
      <ContainerRow>
        <ButtonPrincipal onClick={deleteCostumer} typeButton="danger">
          <FaTrash style={{ marginRight: 5 }} />
          Deletar
        </ButtonPrincipal>
        <ButtonPrincipal
          typeButton="neutral"
          onClick={closeModalModalCreateEditCostumer}
        >
          <FaTimes style={{ marginRight: 5 }} />
          Cancelar
        </ButtonPrincipal>
      </ContainerRow>
    </Modal>
  )

  const modalDetailsCostumer = () => (
    <Modal
      open={openModalDetailsCostumer}
      close={() => {
        setOpenModalDetailsCostumer(false)
        setCostumerEdit({})
      }}
      title="Detalhes do cliente"
    >
      <Label>Nome</Label>
      <p>{costumerEdit?.name}</p>
      <Label>Telefone</Label>
      <p>{costumerEdit?.phone}</p>
      <Label>RG</Label>
      <p>{costumerEdit?.rg}</p>
      <Label>CPF</Label>
      <p>{costumerEdit?.cpf}</p>
      <Label>Endereço</Label>
      <p>{costumerEdit?.address}</p>
      <Label>Nome da mãe</Label>
      <p>{costumerEdit?.name_mother}</p>
    </Modal>
  )

  return (
    <>
      {modalCreateEditCostumer()}
      {modalDeleteCostumer()}
      {modalDetailsCostumer()}
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
            {costumers.map(c => {
              const optionDropDown = [
                { title: <FaEye />, action: () => openModalDetails(c.id) },
                { title: <FaEdit />, action: () => openModalEdit(c.id) },
                {
                  title: <FaTrash color={'red'} />,
                  action: () => openModalExclude(c.id)
                }
              ]

              return (
                <tr key={c.id}>
                  <td>
                    <Dropdown optionsItems={optionDropDown} />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.cpf}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    </>
  )
}
