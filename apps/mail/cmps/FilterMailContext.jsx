const { createContext, useContext, useState } = React

const FilterMailContext = createContext()

export function FilterMailProvider({ children }) {
  const [filterBy, setFilterBy] = useState('')

  return (
    <FilterMailContext.Provider value={{ filterBy, setFilterBy }}>
      {children}
    </FilterMailContext.Provider>
  )
}

export function useFilterMail() {
  return useContext(FilterMailContext)
}
