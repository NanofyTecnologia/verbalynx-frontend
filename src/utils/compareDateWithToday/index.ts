export const compareDateWithRange = (
  startDate: string,
  endDate: string,
): boolean => {
  const parseDate = (dateString: string): Date => {
    const [datePart, timePart] = dateString.split(' - ')

    const [day, month, year] = datePart.split('/').map(Number)
    const [hours, minutes] = timePart.split(':').map(Number)

    return new Date(year, month - 1, day, hours, minutes)
  }

  const start = parseDate(startDate)
  const end = parseDate(endDate)

  const now = new Date()

  return now >= start && now <= end
}
