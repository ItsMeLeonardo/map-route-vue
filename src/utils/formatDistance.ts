export const formatDistance = (
  distance: number,
  language = 'en-US'
): string => {
  if (!distance) return '0km'
  const intl = new Intl.NumberFormat(language, {
    style: 'unit',
    unit: 'kilometer',
  })

  const km = Number((distance / 1000).toFixed(1))

  return intl.format(km)
}
