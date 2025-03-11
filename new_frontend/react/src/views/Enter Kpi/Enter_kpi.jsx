import React, { useState } from 'react'
import "../../../src/index.css"
import { useFormik } from 'formik';

const Enter_Kpi = () => {

const [employeename, Setemployeename] =useState([
    {
        "employee_id": 1,
        "employee_name": "John Doe",
    },
    {
        "employee_id": 2,
        "employee_name": "John Doe 2",
    },
    {
        "employee_id": 3,
        "employee_name": "John Doe 3",
    }
])
const [month, Setmonth] =useState([
    { "id": 1, "name": "January" },
    { "id": 2, "name": "February" },
    { "id": 3, "name": "March" },
    { "id": 4, "name": "April" },
    { "id": 5, "name": "May" },
    { "id": 6, "name": "June" },
    { "id": 7, "name": "July" },
    { "id": 8, "name": "August" },
    { "id": 9, "name": "September" },
    { "id": 10, "name": "October" },
    { "id": 11, "name": "November" },
    { "id": 12, "name": "December" }
  ])
  const [year, Setyear] =useState([
    { "id": 1, "year": "2022" },
    { "id": 2, "year": "2023" },
    { "id": 3, "year": "2024" },
    { "id": 4, "year": "2025" },
    { "id": 5, "year": "2026" },
    { "id": 6, "year": "2027" },
    { "id": 7, "year": "2028" },
    { "id": 8, "year": "2029" },
    { "id": 9, "year": "2030" }
  ]
  )
    const validate = values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Please Select Employee Name';
        } 
      
        if (!values.month) {
          errors.month = 'Please Select Month';
        } 
        if (!values.year) {
            errors.year = 'Please Select Year';
          } 
          if (!values.file) {
            errors.file = "Please Upload a File";
          }
       
        return errors;
      };
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
      return (
      <>
      <h2>Upload Kpi</h2>
        <form onSubmit={formik.handleSubmit} className='w-100 bg-white px-3 py-3 kpi-shadow border-radius-kpi'>
         <div className="d-flex flex-column">
         <label htmlFor="name" className='kpi-employee-text mb-2 mt-2'>Select Employee Name <span className="text-red">*</span></label> 
       <select id="name" className='kpi-input add-employee-input' name="name" onChange={formik.handleChange} value={formik.values.name}> 
       <option value="">Select Employee Name</option> 
        {
            employeename.map((item, index) => {
                return (
                    <option key={index} value={item.employee_id}>{item.employee_name}</option>
                )
            })
        } 
       </select>
   {formik.errors.name ? <div className="error-text text-red fw-bold">{formik.errors.name}</div> : null}
         </div>
    
 <div className="d-flex flex-column">
 <label htmlFor="month" className='kpi-employee-text mb-2 mt-2'> Select Month <span className="text-red">*</span></label>
          <select id="month" name="month" onChange={formik.handleChange} value={formik.values.month} className="add-employee-input"> 
          <option value="">Select Month</option> 
        {
            month.map((item, index) => {
                return <option key={index} value={item.id}>{item.name}</option>
            })
        } 
       </select>
          {formik.errors.month ? <div className="error-text text-red fw-bold">{formik.errors.month}</div> : null}
 </div>
    
      <div className="d-flex flex-column">
      <label htmlFor="year" className='kpi-employee-text mb-2 mt-2'> Select Year <span className="text-red">*</span></label>
          <select id="year" name="year" onChange={formik.handleChange} value={formik.values.year} className="add-employee-input"> 
          <option value="">Select Year</option> 
        {
            year.map((item, index) => {
                return <option key={index} value={item.id}>{item.year}</option>
            })
        } 
       </select>
          {formik.errors.year ? <div className="error-text text-red fw-bold">{formik.errors.year}</div> : null}
      </div>
<div className="d-flex flex-column">
<label htmlFor="file" className='kpi-employee-text mb-2 mt-2'>Upload KPI <span className="text-red">*</span></label>
<input
  id="file"
  name="file"
  type="file"
  onChange={(event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  }}className="add-employee-input"
/>
{formik.errors.file ? <div className="error-text text-red fw-bold"> {formik.errors.file}</div> : null}
</div>

          <button type="submit" className='primary-btn mt-4 w-100'>Submit</button>
        </form>
      
      </>
      );
}

export default Enter_Kpi;

 