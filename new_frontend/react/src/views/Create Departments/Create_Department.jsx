import { useFormik } from 'formik';
import React from 'react';
import '../../../src/index.css';
const Create_Department = () => {
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
    onSubmit: (values) => {
      if (!validate) return 'Working';
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
              <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} className="input" />
            </div>
            {formik.errors.name && formik.touched.name && (
              <div style={{ color: 'red', marginTop: '10px', fontWeight: '700', fontSize: '20px' }}>{formik.errors.name}</div>
            )}
            <button type="submit" className="create-dept-text mt-4 primary-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create_Department;
