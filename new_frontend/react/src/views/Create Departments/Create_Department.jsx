import { useFormik } from 'formik';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../src/index.css';
import { add_department } from '../../Api';

const Create_Department = () => {
  const send_data = async (data, resetForm) => {
    try {
      const response = await add_department(data);
      console.log(response.message);
      
      if (response.status_code === 200) {
        toast.success(response.message);  
        resetForm(); 
      }
      if (response.status_code === 400) {
        toast.error(response.message);  
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Please Enter Department Name';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      send_data(values, resetForm);
    }
  });

  return (
    <>
      <div className="row">
        <div className="col-12 bg-white padding-create-dept box-shadow-create-dept border-radius-create-dept px-4">
          <h2>Create Departments</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column mt-3">
              <label htmlFor="name" className="create-dept-text mb-3 text-dark">
                Enter Department Name{' '}
              </label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                onChange={formik.handleChange} 
                value={formik.values.name} 
                className="input" 
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <div style={{ color: 'red', marginTop: '10px', fontWeight: '700', fontSize: '20px' }}>
                {formik.errors.name}
              </div>
            )}
            <button type="submit" className="create-dept-text mt-4 primary-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Create_Department;
