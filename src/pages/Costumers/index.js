import React, { useEffect, useState } from 'react'
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa'
import { toast } from 'react-toastify'

import Modal from '../../components/Modal'
import Dropdown from '../../components/Dropdown'
import api from '../../core/api'
import { Container, Title, ContainerRow } from './styles'
import { ButtonPrincipal, Input, Label } from '../../styles'
import Spinner from '../../components/Spinner'
import { maskPattern } from '../../core/helper'
import InputMaskCustomized from '../../components/InputMaskCustomized'

export default function Dashboard() {
  const [loading, setLoading] = useState(false)

  const [costumers, setCostumers] = useState([])
  const [openModalDeleteCostumer, setOpenModalDeleteCostumer] = useState(false)
  const [openModalCreateCostumer, setOpenModalCreateCostumer] = useState(false)
  const [openModalDetailsCostumer, setOpenModalDetailsCostumer] =
    useState(false)
  // create | edit
  const [selectedModalCreateEditCostumer, setSelectedModalCreateEditCostumer] =
    useState('create')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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
      setLoading(true)

      const response = await api
        .get('customers')
        .finally(() => setLoading(false))

      setCostumers(response.data)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const closeModalModalCreateEditCostumer = () => {
    setOpenModalCreateCostumer(false)
    setOpenModalDeleteCostumer(false)

    setName('')
    setEmail('')
    setPhone('')
    setCPF('')
    setRG('')
    setAddress('')
    setNameMother('')
    setCostumerEdit({})
  }

  const openModalDetails = async idCostumer => {
    try {
      setLoading(true)
      const response = await api
        .get(`customers/${idCostumer}`)
        .finally(() => setLoading(false))

      setCostumerEdit(response.data)
      setOpenModalDetailsCostumer(true)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }

  const openModalEdit = async idCostumer => {
    try {
      setLoading(true)

      const response = await api
        .get(`customers/${idCostumer}`)
        .finally(() => setLoading(false))

      setCostumerEdit(response.data)
      setName(response.data.name)
      setPhone(response.data.cellphone)
      setCPF(response.data.cpf)
      setRG(response.data.rg)
      setAddress(response.data.address)
      setNameMother(response.data.name_mother)
      setOpenModalCreateCostumer(true)
      setSelectedModalCreateEditCostumer('edit')
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const openModalExclude = async idCostumer => {
    try {
      setLoading(true)

      const response = await api
        .get(`customers/${idCostumer}`)
        .finally(() => setLoading(false))

      setCostumerEdit(response.data)
      setOpenModalDeleteCostumer(true)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const createCostumer = async () => {
    try {
      setLoading(true)

      const response = await api
        .post('customers', {
          name,
          email,
          cellphone: phone,
          rg: RG,
          cpf: CPF,
          address,
          name_mother: nameMother
        })
        .finally(() => setLoading(false))

      toast.success('Cadastrado com sucesso!')

      closeModalModalCreateEditCostumer()
      getData()
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const editCostumer = async () => {
    try {
      setLoading(true)

      const response = await api
        .put(`customers/${costumerEdit?.id}`, {
          name,
          cellphone: phone,
          rg: RG,
          cpf: CPF,
          address,
          name_mother: nameMother
        })
        .finally(() => setLoading(false))

      toast.success('Cliente salvo com sucesso!')

      closeModalModalCreateEditCostumer()
      getData()
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  const deleteCostumer = async () => {
    try {
      setLoading(true)

      const response = await api
        .delete(`customers/${costumerEdit?.id}`)
        .finally(() => setLoading(false))

      toast.warn('Cliente deletado com sucesso!')

      closeModalModalCreateEditCostumer()
      getData()
    } catch (error) {
      setLoading(false)
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
      <Label>Email</Label>
      <Input
        value={email}
        onChange={event => setEmail(event.target.value)}
        disabled={selectedModalCreateEditCostumer === 'edit'}
      />
      <Label>Telefone</Label>
      <InputMaskCustomized
        type="cell"
        value={phone}
        onChange={event => setPhone(event.target.value)}
      />
      {/*<Input value={phone} onChange={event => setPhone(event.target.value)} />*/}
      <Label>CPF</Label>
      <InputMaskCustomized
        type="cpf"
        value={CPF}
        onChange={event => setCPF(event.target.value)}
      />
      {/*<Input value={CPF} onChange={event => setCPF(event.target.value)} />*/}
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
      <p>{costumerEdit?.cellphone}</p>
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
      <Spinner loading={loading} />
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
                  <td>{c.cellphone}</td>
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
