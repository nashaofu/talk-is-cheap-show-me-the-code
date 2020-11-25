function camelCase(str) {
  return str.replace(/[^a-z]+([a-z])/ig, (match, $1) => {
    return $1.toUpperCase()
  })
}

camelCase('as_sdsad')
