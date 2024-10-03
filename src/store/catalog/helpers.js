export const getExistParams = (params) => {
  const exist = {}
  for (const key in params) {
    const value = params[key]
    if (![null, '', undefined].includes(value)) {
      exist[key] = value
    }
  }
  return exist
}
