import React, { useContext } from 'react'
import Dashboard_cards from './dasboard-cards'
import "../../../src/index.css"
import Second_User from './second-user'
import { useEffect, useState } from 'react'
import { fetchAllDepartments } from '../../Api'
import { useNavigate } from 'react-router-dom'
const First_Dept = () => {
const {departmets,employees, fetchallemp} = useContext(Employee_Context)
const navigate = useNavigate()
const changeRoute = () =>{navigate('/second-step')}
  return (
   <>
   <h4>Please Select Department</h4>
   <input type="text" className="add_Employee_input w-100 mt-2" placeholder='Serach By Dept Name..'/>
   <Dashboard_cards data = {departmets} dept = {employees} fetchallemp = {fetchallemp} changeRoute = {changeRoute}/>
   {/* <Second_User/> */}
   </>
  )
}

export default First_Dept