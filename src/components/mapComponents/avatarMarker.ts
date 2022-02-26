const customMarkerContainer = document.createElement('span')
const customMarkerImage = document.createElement('img')

const containerClasses =
  'h-12 w-12 p-0.5 flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl shadow-violet-500/50 rounded-full'

const imageClasses =
  'w-full h-full object-cover rounded-full border-4 border-white'

customMarkerContainer.className = containerClasses
customMarkerImage.className = imageClasses

customMarkerImage.src =
  'https://i.pinimg.com/564x/89/33/f6/8933f6ef2767f7c1969c81c60e853005.jpg'
customMarkerImage.alt = 'you profile'

customMarkerContainer.appendChild(customMarkerImage)

export default customMarkerContainer
