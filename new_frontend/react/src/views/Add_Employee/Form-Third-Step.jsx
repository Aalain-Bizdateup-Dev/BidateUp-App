import React, { useContext } from 'react'
import "../../../src/index.css"
import { Employee_Context } from './employee_context';
const Form_Third_Step = () => {
    const {step, setstep} = useContext(Employee_Context);
    console.log(step);
    const next = ()=>{
      setstep((prev) => prev + 1)
    }
    const back = ()=>{
      setstep((prev) => prev - 1)
    }
  return (
<>

<h3>Review Details</h3>
<div className="row">
<div className="w-50">
<div className="col-12 bg-white  px-3 py-3" >
  <h3 className=''>Personal Details:</h3>
<div className="d-flex justify-content-between">
<p className='review-text fw-semibold'>Batch Id:</p>
<p className='review-text fw-semibold'>123</p>
</div>
<hr  className='m-0'/>

<div className="d-flex justify-content-between mt-3">
<p className='review-text fw-semibold'>Name:</p>
<p className='review-text fw-semibold'>Test Name</p>
</div>
<hr  className='m-0'/>

<div className="d-flex justify-content-between mt-3">
<p className='review-text fw-semibold'>Email:</p>
<p className='review-text fw-semibold'>tets@gmail.com</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3">
<p className='review-text fw-semibold'>Department:</p>
<p className='review-text fw-semibold'>Test DEpt</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3">
<p className='review-text fw-semibold'>Role:</p>
<p className='review-text fw-semibold'>Test Role</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3">
<p className='review-text fw-semibold'>Phone Number:</p>
<p className='review-text fw-semibold'>123</p>
</div>
<hr  className='m-0'/>
</div>
  </div>
  <div className="w-50">
<div className="col-12 bg-white mx-3 px-3 py-3" >
<h3 className=''>KPI:</h3>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Jan KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Feb KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Mar KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>April KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>May KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>June KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>July KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Aug KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Sept KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Oct KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Nov KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Dec KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Jan-Mar KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>April-June KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>July-Sept  KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Oct-Dec  KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
<div className="d-flex justify-content-between mt-3 align-items-center">
<p className='review-text fw-semibold mb-0'>Yearly   KPI</p>
<p className='uploaded-text   bg-green-500 p-2'>Uploaded Successfully</p>
</div>
<hr  className='m-0'/>
</div>

  </div>
  <div className='d-flex justify-content-between'>
        <button type="" className='col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn' onClick={back}>   
        <i class="material-icons-two-tone text-white mx-2"> keyboard_backspace</i> 
          
          Back</button>
        <button type="" className='col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn'> Submit 

        </button>

         </div>
</div>
</>
  )
}

export default Form_Third_Step