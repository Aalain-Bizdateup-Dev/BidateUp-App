import React from 'react'
import Dashboard_cards from './dasboard-cards'

const Second_User = () => {
  return (
<>
<h4>Please Select Employee</h4>
   <input type="text" className="add_Employee_input w-100 mt-2" placeholder='Serach By Dept Name..'/>
      <Dashboard_cards/>
      </>
  )
}

export default Second_User