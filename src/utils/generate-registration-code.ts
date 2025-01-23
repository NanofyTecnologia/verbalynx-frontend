import { customAlphabet } from 'nanoid'

function generateRegistrationCode() {
  const generateCode = customAlphabet('123456789')

  return generateCode(8).concat('-').concat(generateCode(1))
}

export { generateRegistrationCode }
