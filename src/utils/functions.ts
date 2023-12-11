import { NEAR_TIMESTAMP_CONVERTER_FACTOR } from './constants'

export function dateFormatter(date: bigint): string {
  const formattedDate = new Date(
    Number(date) / NEAR_TIMESTAMP_CONVERTER_FACTOR,
  ).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    minute: '2-digit',
    hour: 'numeric',
  })

  return formattedDate
}
