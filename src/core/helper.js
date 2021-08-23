export const colors = {
  background: '#fff',
  primary: '#4310c4'
}

export function generateRandomNumberString() {
  const randomNumber = Math.random() * 10
  const randomNumberString = String(randomNumber).replace('.', '')

  return randomNumberString
}
