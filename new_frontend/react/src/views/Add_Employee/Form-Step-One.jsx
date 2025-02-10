import React from 'react';
import { useFormik } from 'formik';
import '../../../src/index.css';
const Step_One = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.batchid) {
      errors.batchid = 'Batch Id Required';
    }
    if (!values.name) {
      errors.name = 'Name Is Required';
    }
    if (!values.role) {
      errors.role = 'Role Is Required';
    }
    if (!values.number) {
      errors.number = 'Number Is Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } 
 
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      batchid: '',
      name: '',
      email: '',
      number:"",
      role:""
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mt-4">
        <div className="col-6 d-flex flex-column">
          <label htmlFor="batchid" className="mb-2 add_employee_label">
            Enter Batch ID <span className="color-red">*</span>
          </label>
          <input
            name="batchid"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.batchid}
            className="add_Employee_input"
            placeholder="Enter Batch id .."
          />
          {formik.errors.batchid ? <div className='color-red fw-semibold err-font'>{formik.errors.batchid}</div> : null}
        </div>
        
        <div className="col-6 d-flex flex-column">
          <label htmlFor="name" className="mb-2 add_employee_label">
            Enter Name <span className="color-red">*</span>
          </label>
          <input
          id = "name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="add_Employee_input"
            placeholder="Enter Name..."
          />
          {formik.errors.name ? <div className='color-red fw-semibold err-font'>{formik.errors.name}</div> : null}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6 d-flex flex-column">
          <label htmlFor="email" className="mb-2 add_employee_label">
          Enter Email Id <span className="color-red">*</span>
          </label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="add_Employee_input"
            placeholder="Enter Email Id .."
          />
          {formik.errors.email ? <div className='color-red fw-semibold err-font'>{formik.errors.email}</div> : null}
        </div>
        
        {/* <div className="col-6 d-flex flex-column">
          <label htmlFor="name" className="mb-2 add_employee_label">
          Select Department    <span className="color-red">*</span>
          </label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="add_Employee_input"
            placeholder="Select Department  ..."
          />
          <select name="Select DEpt" id="" onChange={formik.handleChange} value={formik.values.name}    className="add_Employee_input">

          <option value="Test">Test</option>
          <option value="Test">Test</option>
          <option value="Test">Test</option>
          </select>
         
          {formik.errors.name ? <div className='color-red fw-semibold err-font'>{formik.errors.name}</div> : null}
        </div> */}
      </div>
      <div className="row mt-4">
        <div className="col-6 d-flex flex-column">
          <label htmlFor="role" className="mb-2 add_employee_label">
          Enter Role <span className="color-red">*</span>
          </label>
          <input
            name="role"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="add_Employee_input"
            placeholder="Enter Email Id .."
          />
          {formik.errors.role ? <div className='color-red fw-semibold err-font'>{formik.errors.role}</div> : null}
        </div>
        
        <div className="col-6 d-flex flex-column">
          <label htmlFor="name" className="mb-2 add_employee_label">
          Enter Phone Number    <span className="color-red">*</span>
          </label>
          <input
            name="number"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.number}
            className="add_Employee_input"
            placeholder="Select Department  ..."
          />
         
          {formik.errors.number ? <div className='color-red fw-semibold err-font'>{formik.errors.number}</div> : null}
        </div>
      </div>
    <div className="row justify-content-end">
    <button type="submit" className='col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn'> Next</button>
    </div>
    </form>

  );
};

export default Step_One;
