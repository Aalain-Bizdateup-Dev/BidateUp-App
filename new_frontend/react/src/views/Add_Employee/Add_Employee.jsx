import React, { useEffect, useState } from 'react';
import '../../../src/index.css';
import { Formik, Form, Field } from 'formik';
import { add_employee, get_departments } from '../../Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Add_Employee = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDeptData = async () => {
      const response = await get_departments();
      console.log(response.data);
      setDepartments(response.data);
    };
    getDeptData();
  }, []);

 const addempToDb = async (data, resetForm) => {
    try {
      const response = await add_employee(data);
      console.log(response.message);
      
      if (response.status_code === 200) {
        toast.success(response.message);  
        resetForm(); 
      }
      if (response.status_code === 400) {
        toast.error(response.message);  
      }
    } catch (error) {
    }
  };
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
    if (!values.department_name) {
      errors.department_name = 'Please Select Department';
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
 <>
    <div className="row">
      <div className="col-12 bg-white p-4 add-employee-box-shadow add-employee-border-radius">
        <h2>Add Employee Details</h2>
        <Formik
          initialValues={{
            employee_type: '',
            employee_id: '',
            email: '',
            department_name: '',
            designation: '',
            phone_number: "",
            name: '',
            employee_status: true 
          }}
          validate={validate}
          onSubmit={async (values,{resetForm}) => {
            const formattedValues = {
              ...values,
              phone_number: String(values.phone_number), 
            };
            addempToDb(formattedValues)
            resetForm()
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
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Employee">Employee</option>
                    <option value="Consultant">Consultant</option>
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
                  <Field as="select" name="department_name" id="department_name" className="add-employee-input">
                    <option value="" disabled>Select Department</option> {/* Default placeholder */}
                    {departments?.map((department, index) => (
                      <option key={index} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </Field>
                  {errors.department_name && touched.department_name && (
                    <div className="error-text text-red fw-bold">{errors.department_name}</div>
                  )}
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
          <ToastContainer />
 
 </>
    
  );
};

export default Add_Employee;
