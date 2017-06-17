export const createTypes = (n : number = 1) : symbol[] => {
  const types : symbol[] = []
  for(let i = 0; i < n; i++) {
    types.push(Symbol())
  }

  return types
}
