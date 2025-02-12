import React, { useContext } from 'react'
import Dashboard_cards from './dasboard-cards'
import "../../../src/index.css"
import Second_User from './second-user'
import { useEffect, useState } from 'react'
import { fetchAllDepartments } from '../../Api'
import { Employee_Context } from '../Add_Employee/employee_context'
const First_Dept = () => {
const {departmets} = useContext(Employee_Context)



  
  return (
   <>
   {/* <h1>Hello User</h1> */}
   <h4>Please Select Department</h4>
   <input type="text" className="add_Employee_input w-100 mt-2" placeholder='Serach By Dept Name..'/>
   <Dashboard_cards data = {departmets}/>
   <Second_User/>
   </>
  )
}

export default First_Dept