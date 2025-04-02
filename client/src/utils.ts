const FULL_MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const SMALL_MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export function getLargeDate(date: string | Date) {
  const newDate = new Date(date)
  const dateString = FULL_MONTHS[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
  return dateString
}

export function getSmallDate(date: string | Date) {
  const newDate = new Date(date)
  const dateString = SMALL_MONTHS[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
  return dateString
}
