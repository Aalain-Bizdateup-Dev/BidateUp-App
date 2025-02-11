import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { Employee_Context } from './employee_context';

const Second_Step = () => {

  
  const {step, setstep} = useContext(Employee_Context);
  console.log(step);
  const next = ()=>{
    setstep((prev) => prev + 1)
  }
  
  const back = ()=>{
    setstep((prev) => prev - 1)
  }
    const validate = values => {
        const errors = {};
        if (!values.jan_file) {
          errors.jan_file = 'Required Jan File';
        } 
        if (!values.feb_file) {
            errors.feb_file = 'Required Feb File';
          } 
          if (!values.march_file) {
            errors.march_file = 'Required March File';
          } 
          if (!values.april_file) {
            errors.april_file = 'Required April File';
          } 
          if (!values.may_file) {
            errors.may_file = 'Required May File';
          } 
          if (!values.june_file) {
            errors.june_file = 'Required June File';
          } 
          if (!values.july_file) {
            errors.july_file = 'Required July File';
          } 
          if (!values.aug_file) {
            errors.aug_file = 'Required August File';
          } 
          if (!values.sept_file) {
            errors.sept_file = 'Required Sept File';
          } 
          if (!values.oct_file) {
            errors.oct_file = 'Required Oct File';
          } 
          if (!values.nov_file) {
            errors.nov_file = 'Required Nov File';
          } 
          if (!values.dec_file) {
            errors.dec_file = 'Required Dec File';
          } 
          if (!values.jan_mar_file) {
            errors.jan_mar_file = 'Required Jan - Mar File';
          } 
          if (!values.july_sept_file) {
            errors.july_sept_file = 'Required July - Sept File';
          } 
          if (!values.april_june_file) {
            errors.april_june_file = 'Required April - June File';
          } 
          if (!values.oct_dec_file) {
            errors.oct_dec_file = 'Required Oct - Dec File';
          } 
          if (!values.yearly_file) {
            errors.yearly_file = 'Required Yearly File';
          } 
        return errors;
      };    
      const formik = useFormik({
        initialValues: {
          jan_file: '',
          feb_file: '',
          march_file: '',
          april_file: '',
          may_file: '',
          june_file: '',
          july_file: '',
          aug_file: '',
          sept_file: '',
          oct_file: '',
          nov_file: '',
          dec_file: '',
          jan_mar_file: '',
          july_sept_file: '',
          april_june_file: '',
          oct_dec_file: '',
          yearly_file: '',
        },
        
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
          <h3>Monthly KPI:</h3>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload Jan Kpi</label>
          <input
            name="jan_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.jan_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.jan_file ? <div>{formik.errors.jan_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload July Kpi</label>
          <input
            name="july_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.july_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.july_file ? <div>{formik.errors.july_file}</div> : null}    
            </div>

         </div>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload Feb Kpi</label>
          <input
            name="feb_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.feb_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.feb_file ? <div>{formik.errors.feb_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload August Kpi</label>
          <input
            name="aug_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.aug_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.aug_file ? <div>{formik.errors.aug_file}</div> : null}    
            </div>

         </div>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload March Kpi</label>
          <input
            name="march_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.march_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.march_file ? <div>{formik.errors.march_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Sept Kpi</label>
          <input
            name="sept_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.sept_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.sept_file ? <div>{formik.errors.sept_file}</div> : null}    
            </div>

         </div>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload April Kpi</label>
          <input
            name="april_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.april_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.april_file ? <div>{formik.errors.april_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Oct Kpi</label>
          <input
            name="oct_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.oct_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.oct_file ? <div>{formik.errors.oct_file}</div> : null}    
            </div>

         </div>

         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload May Kpi</label>
          <input
            name="may_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.may_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.may_file ? <div>{formik.errors.may_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Nov Kpi</label>
          <input
            name="nov_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.nov_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.nov_file ? <div>{formik.errors.nov_file}</div> : null}    
            </div>

         </div>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload June Kpi</label>
          <input
            name="june_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.june_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.june_file ? <div>{formik.errors.june_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Dec Kpi</label>
          <input
            name="dec_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.dec_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.dec_file ? <div>{formik.errors.dec_file}</div> : null}    
            </div>

         </div>
         <h3>Quartely KPI:
         </h3>

{/* jan March Kpi */}

<div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload Jan-Mar Kpi</label>
          <input
            name="jan_mar_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.jan_mar_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.jan_mar_file ? <div>{formik.errors.jan_mar_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload July-Sept Kpi</label>
          <input
            name="july_sept_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.july_sept_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.july_sept_file ? <div>{formik.errors.july_sept_file}</div> : null}    
            </div>

         </div>
         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label  className="mb-2 add_employee_label">Upload April-June Kpi</label>
          <input
            name="april_june_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.april_june_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.april_june_file ? <div>{formik.errors.april_june_file}</div> : null}    
            </div>
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Oct-Dec Kpi</label>
          <input
            name="oct_dec_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.oct_dec_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.oct_dec_file ? <div>{formik.errors.oct_dec_file}</div> : null}    
            </div>

         </div>
         <h3>Yearly KPI:
         </h3>

         <div className="row">
            <div className="col-6 d-flex flex-column">
            <label className="mb-2 add_employee_label">Upload Yearly Kpi</label>
          <input
            name="yearly_file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.yearly_file} className='add_Employee_input cursor-pointer'
          />
          {formik.errors.yearly_file ? <div>{formik.errors.yearly_file}</div> : null}    
            </div>
         </div>
         <div className='d-flex justify-content-between'>
          <p>Test</p>
        <button type="" className='col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn' onClick={back}>   
        <i class="material-icons-two-tone text-white mx-2"> keyboard_backspace</i> 
          Back</button>
        <button type="" className='col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn' onClick={next}> Next 
        <i class="material-icons-two-tone text-white"> navigate_next</i> 
        </button>

         </div>

        </form>
        
      );
}

export default Second_Step