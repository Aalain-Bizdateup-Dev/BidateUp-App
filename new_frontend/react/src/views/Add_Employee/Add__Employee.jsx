import React, { useContext } from 'react'
import Step_One from './Form-Step-One'
import Test from '../test'
import Second_Step from './Form-Second-Step'
import Form_Third_Step from './Form-Third-Step'
import Employee_context_Second, { Employee_Context } from './employee_context'


const Add__Employee = () => {
const {step} = useContext(Employee_Context)  
console.log(step);

  return (
    <>

<Step_One/>
    <Second_Step/>
    <Form_Third_Step/>

    </>
  )
}

export default Add__Employee