const gridColumns = () => {
  const root = document.documentElement
  const columns = getComputedStyle(root).getPropertyValue('--columns')
  const fields = parseInt(getComputedStyle(root).getPropertyValue('--fields'))

  root.style.setProperty('--columnJs', (document.body.scrollWidth - fields * 2) / columns + 'px')
}
gridColumns()