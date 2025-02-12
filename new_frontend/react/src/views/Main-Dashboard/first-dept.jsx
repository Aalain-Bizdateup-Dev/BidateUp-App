import React, { useContext } from 'react'
import Dashboard_cards from './dasboard-cards'
import "../../../src/index.css"
import Second_User from './second-user'
import { useEffect, useState } from 'react'
import { fetchAllDepartments } from '../../Api'
import { Employee_Context } from '../Add_Employee/employee_context'
const First_Dept = () => {
const {departmets,employees, fetchallemp} = useContext(Employee_Context)


  return (
   <>
   <h4>Please Select Department</h4>
   <input type="text" className="add_Employee_input w-100 mt-2" placeholder='Serach By Dept Name..'/>
   <Dashboard_cards data = {departmets} dept = {employees} fetchallemp = {fetchallemp}/>
   <Second_User/>
   </>
  )
}

export default First_Dept