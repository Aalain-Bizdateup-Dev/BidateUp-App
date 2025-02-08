import { useFormik } from 'formik';
import React from 'react'

const Second_Step = () => {
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
            errors.jan_mar_file = 'Required Jan File';
          } 
          if (!values.july_sept_file) {
            errors.july_sept_file = 'Required Jan File';
          } 
          if (!values.april_june_file) {
            errors.april_june_file = 'Required Jan File';
          } 
          if (!values.oct_dec_file) {
            errors.oct_dec_file = 'Required Jan File';
          } 
          if (!values.yearly_file) {
            errors.yearly_file = 'Required Jan File';
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
    
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
    
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
    
          <button type="submit">Submit</button>
        </form>
        
      );
}

export default Second_Step