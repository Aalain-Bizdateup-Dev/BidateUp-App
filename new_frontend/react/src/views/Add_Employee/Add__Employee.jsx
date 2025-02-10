import React, { useContext } from 'react'

import Employee_context_Second, { Employee_Context } from './employee_context'
import { Step, StepLabel, Stepper } from '@mui/material'
import Form_Third_Step from './Form-Third-Step'
import Step_One from './Form-Step-One'
import Second_Step from './Form-Second-Step'
import "../../../src/index.css"
const Add__Employee = () => {
const {step} = useContext(Employee_Context)  
const renderStep = (step) => {
  switch (step) {
    case 0:
      return <Step_One/>;
    case 1:
      return <Second_Step />;
    case 2:
      return <Form_Third_Step />;
    default:
      return null;
  }
};
  return (
    <>
  <Stepper activeStep={step} alternativeLabel>
          <Step className='step_form_details_text'>
            <StepLabel >Personal Details</StepLabel>
          </Step>
          <Step >
            <StepLabel>KPI</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
{renderStep(step)}

    </>
  )
}

export default Add__Employee