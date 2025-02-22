import React from 'react';
import '../../../src/index.css';
import { Formik, Form, Field } from 'formik';

const Add_Employee = () => {
  const validate = (values) => {
    let errors = {};

    if (!values.employee_type) {
      errors.employee_type = 'Please Select Employee Type';
    }
    if (!values.employee_id) {
      errors.employee_id = 'Please Enter Employee ID';
    }
    if (!values.email) {
      errors.email = 'Please Enter Email';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Please Enter Email';
    }
    if (!values.department) {
      errors.department = 'Please Select Department';
    }
    if (!values.designation) {
      errors.designation = 'Please Enter Designation';
    }
    if (!values.phone_number) {
      errors.phone_number = 'Please Enter Phone Number';
    }
    if (!values.name) {
      errors.name = 'Please Enter  Name';
    }
    return errors;
  };

  return (
    <div className="row">
      <div className="col-12 bg-white p-4 add-employee-box-shadow add-employee-border-radius">
        <h2>Add Employee Details</h2>
        <Formik
          initialValues={{
            employee_type: '',
            employee_id: '',
            email: '',
            department: '',
            designation: '',
            phone_number: '',
            name: ''
          }}
          validate={validate}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-6 d-flex flex-column">
                  <label htmlFor="employee_type" className="add-employee-label">
                    Employee Type <span className="text-red">*</span>
                  </label>
                  <Field as="select" name="employee_type" id="employee_type" className="add-employee-input">
                    <option value="red">Employee</option>
                    <option value="red">Consultant</option>
                  </Field>
                  {errors.employee_type && touched.employee_type && (
                    <div className="error-text text-red fw-bold">{errors.employee_type}</div>
                  )}
                </div>

                <div className="col-6 d-flex flex-column">
                  <label htmlFor="employee_id" className="add-employee-label">
                    Enter Employee ID <span className="text-red">*</span>
                  </label>
                  <Field id="employee_id" name="employee_id" placeholder="Please enter Employee ID" className="add-employee-input" />
                  {errors.employee_id && touched.employee_id && <div className="error-text text-red fw-bold">{errors.employee_id}</div>}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-6 d-flex flex-column">
                  <label htmlFor="email" className="add-employee-label">
                    Enter Email <span className="text-red">*</span>
                  </label>
                  <Field id="email" name="email" placeholder="Please enter Employee Email" type="email" className="add-employee-input" />
                  {errors.email && touched.email && <div className="error-text text-red fw-bold">{errors.email}</div>}
                </div>

                <div className="col-6 d-flex flex-column">
                  <label htmlFor="department" className="add-employee-label">
                    Select Department <span className="text-red">*</span>
                  </label>
                  <Field as="select" name="department" id="department" className="add-employee-input">
                    <option value="red">Employee</option>
                    <option value="red">Consultant</option>
                  </Field>
                  {errors.department && touched.department && <div className="error-text text-red fw-bold">{errors.department}</div>}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-6 d-flex flex-column">
                  <label htmlFor="designation" className="add-employee-label">
                    Enter Designation <span className="text-red">*</span>
                  </label>
                  <Field id="designation" name="designation" placeholder="Please enter Designation" className="add-employee-input" />
                  {errors.designation && touched.designation && <div className="error-text text-red fw-bold">{errors.designation}</div>}
                </div>

                <div className="col-6 d-flex flex-column">
                  <label htmlFor="phone_number" className="add-employee-label">
                    Enter Phone Number <span className="text-red">*</span>
                  </label>
                  <Field
                    id="phone_number"
                    name="phone_number"
                    placeholder="Please Enter Phone Number"
                    className="add-employee-input"
                    type="number"
                  />
                  {errors.phone_number && touched.phone_number && <div className="error-text text-red fw-bold">{errors.phone_number}</div>}
                </div>
              </div>
              <div className="col-12 d-flex flex-column mt-4">
                <label htmlFor="name" className="add-employee-label">
                  Name <span className="text-red">*</span>
                </label>
                <Field id="name" name="name" placeholder="Please Enter Name" className="add-employee-input" />
                {errors.name && touched.name && <div className="error-text text-red fw-bold">{errors.name}</div>}
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="primary-btn-two mt-4">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Add_Employee;
