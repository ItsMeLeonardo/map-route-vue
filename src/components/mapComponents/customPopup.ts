const createCustomPopup = (content = ''): string => {
  return `
  <div
    class="p-1 w-full h-full rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl shadow-violet-500/50"
  >
    <span class="p-4 flex items-center bg-white rounded-md">
      <h6 class="text-xs">${content}</h6>
    </span>
  </div>
  `
}

export default createCustomPopup
