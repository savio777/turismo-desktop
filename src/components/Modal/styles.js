import styled from 'styled-components'

export const Container = styled.div`
  display: ${props => (props.active ? 'flex' : 'none')}; /* Hidden by default */
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

export const ModalContainer = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;

  h3 {
    text-align: center;
    font-weight: bold;
  }
`

export const ButtonClose = styled.button`
  background-color: #fefefe;
  float: right;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`
