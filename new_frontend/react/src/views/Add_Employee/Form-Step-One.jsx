import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import '../../../src/index.css';
import { Employee_Context } from './employee_context';
import { fetchAllDepartments } from '../../Api';

const Step_One = () => {
  const { step, setstep, formData, updateFormData, setFormData } = useContext(Employee_Context);
  const [datas, setdata] = useState([]);
  const [userselected, setuserselected] = useState('');

  useEffect(() => {
    const fetchdatafordropdown = async () => {
      const data = await fetchAllDepartments();
      setdata(data.data.data);
    };
    fetchdatafordropdown();
  }, []);


  const validate = (values) => {
    const errors = {};
    if (!values.batch_id) {
      errors.batch_id = 'Batch Id Required';
    }
    if (!values.name) {
      errors.name = 'Name Is Required';
    }
    if (!values.phone_number) {
      errors.phone_number = 'Number Is Required';
    }
    if (!values.email) {
      errors.email = 'Email Is Required';
    }
    if (!values.department_name) {
      errors.department_name = 'Department Is Required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: formData,
    validate,
    onSubmit: (values) => {
      updateFormData({ ...values, "user_role": userselected });
      setstep((prev) => prev + 1);
    }
  });

  
  useEffect(() => {
    const findRole = () => {
      const role = datas?.find((item) => item.name === formik.values.department_name)?.role;
      if (role && role !== formik.values.user_role) {
        setuserselected(role);
        formik.setFieldValue('user_role', role); // Update the role in Formik form only if it's different
      }
    };

    if (formik.values.department_name) {
      findRole();
    }
  }, [formik.values.department_name, datas]); // Add formik.values.role to prevent unnecessary updates

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mt-4">
        <div className="col-6 d-flex flex-column">
          <label htmlFor="batch_id" className="mb-2 add_employee_label">
            Enter Batch ID <span className="color-red">*</span>
          </label>
          <input
            name="batch_id"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.batch_id}
            className="add_Employee_input"
            placeholder="Enter Batch id .."
          />
          {formik.errors.batch_id && <div className="color-red fw-semibold err-font">{formik.errors.batch_id}</div>}
        </div>

        <div className="col-6 d-flex flex-column">
          <label htmlFor="name" className="mb-2 add_employee_label">
            Enter Name <span className="color-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="add_Employee_input"
            placeholder="Enter Name..."
          />
          {formik.errors.name && <div className="color-red fw-semibold err-font">{formik.errors.name}</div>}
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
          {formik.errors.email && <div className="color-red fw-semibold err-font">{formik.errors.email}</div>}
        </div>

        <div className="col-6 d-flex flex-column">
          <label htmlFor="department_name" className="mb-2 add_employee_label">
            Select Department <span className="color-red">*</span>
          </label>
          <select
            value={formik.values.department_name}
            name="department_name"
            id="department_name"
            onChange={formik.handleChange}
            className="add_Employee_input"
          >
            {datas?.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {formik.errors.department_name && <div className="color-red fw-semibold err-font">{formik.errors.department_name}</div>}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-6 d-flex flex-column">
          <label htmlFor="user_role" className="mb-2 add_employee_label">
            Enter Role <span className="color-red">*</span>
          </label>
          <input
            name="user_role"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.user_role}
            className="add_Employee_input"
            readOnly
          />
        </div>

        <div className="col-6 d-flex flex-column">
          <label htmlFor="phone_number" className="mb-2 add_employee_label">
            Enter Phone Number <span className="color-red">*</span>
          </label>
          <input
            name="phone_number"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
            className="add_Employee_input"
            placeholder="Enter Number ..."
          />
          {formik.errors.phone_number && <div className="color-red fw-semibold err-font">{formik.errors.phone_number}</div>}
        </div>
      </div>

      <div className="row justify-content-end">
        <button
          type="submit"
          className="col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn"
        >
          Next <i className="material-icons-two-tone text-white"> navigate_next</i>
        </button>
      </div>
    </form>
  );
};

export default Step_One;
