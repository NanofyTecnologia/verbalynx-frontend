export function generateRegistrationCode(): string {
  const randomPart = Math.floor(1000000 + Math.random() * 9000000)
  const checkDigit = Math.floor(Math.random() * 10)
  return `${randomPart}-${checkDigit}`
}
