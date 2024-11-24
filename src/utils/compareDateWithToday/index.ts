// export const compareDateWithToday = (inputDate: string): boolean => {
//   const [day, month, year] = inputDate.split('/').map(Number)
//   const dateToCompare = new Date(year, month - 1, day)

//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   if (dateToCompare > today) {
//     return true
//   } else {
//     return false
//   }
// }

export const compareDateWithToday = (inputDate: string): boolean => {
  // Separar a data e o horário
  const [datePart, timePart] = inputDate.split(' - ')

  // Extrair dia, mês e ano
  const [day, month, year] = datePart.split('/').map(Number)

  // Extrair horas e minutos
  const [hours, minutes] = timePart.split(':').map(Number)

  // Criar um objeto Date com a data e hora fornecidas
  const dateToCompare = new Date(year, month - 1, day, hours, minutes)

  // Obter a data e hora atuais
  const now = new Date()

  // Comparar se a data fornecida é maior que a atual
  if (dateToCompare > now) {
    return true
  } else {
    return false
  }
}
