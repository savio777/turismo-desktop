import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

import { Container, override } from './styles'

const Spinner = ({ loading = false }) => (
  <Container active={loading}>
    <PuffLoader loading={loading} css={override} size={150} />
  </Container>
)

export default Spinner
