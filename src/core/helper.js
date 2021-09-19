export const colors = {
  background: '#fff',
  primary: '#4310c4'
}

export function generateRandomNumberString() {
  const randomNumber = Math.random() * 10
  const randomNumberString = String(randomNumber).replace('.', '')

  return randomNumberString
}

// ex phone: maskPattern("999999999999999", "(##) ####-####");
export const maskPattern = (valueString = '', patternString = '') => {
  let i = 0

  return patternString.replace(/#/g, () => valueString[i++] || '')
}
