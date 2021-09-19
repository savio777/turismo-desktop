import React from 'react'

import InputMask from 'react-input-mask'

import { Input } from '../../styles'

const typeMask = (type = '') => {
  switch (type) {
    case 'cell':
      return '(99) 99999-9999'
    case 'cpf':
      return '999.999.999-99'
    default:
      break
  }
}

const InputMaskCustomized = ({ type = '', value, onChange }) => (
  <InputMask mask={typeMask(type)} value={value} onChange={onChange}>
    {inputProps => <Input {...inputProps} />}
  </InputMask>
)

export default InputMaskCustomized
