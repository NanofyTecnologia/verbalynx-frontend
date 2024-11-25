export const compareDateWithToday = (inputDate: string): boolean => {
  const [datePart, timePart] = inputDate.split(' - ')

  const [day, month, year] = datePart.split('/').map(Number)

  const [hours, minutes] = timePart.split(':').map(Number)

  const dateToCompare = new Date(year, month - 1, day, hours, minutes)

  const now = new Date()

  if (dateToCompare > now) {
    return true
  } else {
    return false
  }
}
