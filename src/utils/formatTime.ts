export const formatTime = (seconds: number): string => {
  if (!seconds) return '00h, 00m, 00s'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsLeft = Math.floor(seconds % 60)

  if (!hours && !minutes) {
    return `${secondsLeft}s`
  }
  if (!hours) {
    return `${minutes}m, ${secondsLeft}s`
  }

  return `${hours}h, ${minutes}m, ${secondsLeft}s`
}
