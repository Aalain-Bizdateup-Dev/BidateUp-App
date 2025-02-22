import React, { useContext } from 'react'
import Dashboard_cards from './dasboard-cards'
import Employee_Cards from './employee-cards'

const Second_User = () => {
  const {employees, loading} = useContext(Employee_Context)
console.log(employees);
  return (
<>
<h4>Please Select Employee</h4>
   <input type="text" className="add_Employee_input w-100 mt-2" placeholder='Serach By Dept Name..'/>
      <Employee_Cards employees = {employees} loading = {loading}/>
      </>
  )
}

export default Second_User