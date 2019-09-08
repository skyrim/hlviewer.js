export function basename(path: string, extension?: string) {
  return path.slice(path.lastIndexOf('/') + 1).replace(extension || '', '')
}

export function extname(path: string) {
  const slashPos = path.lastIndexOf('/')
  const dotPos = path.lastIndexOf('.')
  if (slashPos < dotPos) {
    return path.slice(dotPos)
  } else {
    return ''
  }
}
