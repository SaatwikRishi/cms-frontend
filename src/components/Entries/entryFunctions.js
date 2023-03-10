const updateEntries = (type, data, entries) => {
  if (type === 'modify') {
    return entries.map(entry => entry.id === data.id ? data : entry).sort((a, b) => a.id - b.id)
  } else if (type === 'delete') {
    return (entries.filter(entry => entry.id !== data))
  }
  return ([...entries, data])
}

module.exports = { updateEntries }
