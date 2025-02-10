import React, { createContext, useState } from 'react'


export const Employee_Context = createContext()

const Employee_context_Second = ({children}) => {
    const [step, setstep] = useState(0)
    console.log(`this is step:${step}`);
    
  return (
<Employee_Context.Provider value={{step, setstep}}>
  {children}
</Employee_Context.Provider>
  )
}

export default Employee_context_Second