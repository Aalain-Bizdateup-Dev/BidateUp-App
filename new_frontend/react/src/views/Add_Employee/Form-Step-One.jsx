import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import '../../../src/index.css';
import { Employee_Context } from './employee_context';
import { fetchAllDepartments } from '../../Api';
const Step_One = () => {
  const errors = {};
  const { step, setstep } = useContext(Employee_Context);
  const [datas, setdata] = useState();
  const [userselected, setuserselected] = useState('');
  useEffect(() => {
    const fetchdatafordropdown = async () => {
      const data = await fetchAllDepartments();
      setdata(data.data.data);
    };
    fetchdatafordropdown();
  }, []);



  const back = () => {
    setstep((prev) => prev - 1);
  };
  const validate = (values) => {
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
    if (!values.dept) {
      errors.dept = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      batchid: '',
      name: '',
      email: '',
      number: '',
      role: '',
      dept:''
    },
    validate,
    onSubmit: (values) => {

      
      setstep((prev) => prev + 1);
    }
  });
  useEffect(() => {
    const findRole = () => {
      const role = datas?.find((item) => item.name === formik.values.dept);
      setuserselected(role?.role || "");
    };
  
    findRole();
  }, [formik.values.dept, datas]); 
  

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
          {formik.errors.batchid ? <div className="color-red fw-semibold err-font">{formik.errors.batchid}</div> : null}
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
          {formik.errors.name ? <div className="color-red fw-semibold err-font">{formik.errors.name}</div> : null}
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
          {formik.errors.email ? <div className="color-red fw-semibold err-font">{formik.errors.email}</div> : null}
        </div>

        <div className="col-6 d-flex flex-column">
          <label htmlFor="dept" className="mb-2 add_employee_label">
            Select Department <span className="color-red">*</span>
          </label>
          <select value={formik.values.dept} name="dept" id="dept" onChange={formik.handleChange} className="add_Employee_input">
            {datas?.map((item) => {
              return (
                <>
                  <option value={item.name}>{item.name}</option>
                </>
              );
            })}
          </select>

          {formik.errors.dept ? <div className="color-red fw-semibold err-font">{formik.errors.dept}</div> : null}
        </div>
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
            value={userselected}
            className="add_Employee_input"
            readOnly
          />
          </div>

        <div className="col-6 d-flex flex-column">
          <label htmlFor="name" className="mb-2 add_employee_label">
            Enter Phone Number <span className="color-red">*</span>
          </label>
          <input
            name="number"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.number}
            className="add_Employee_input"
            placeholder="Enter Number  ..."
          />

          {formik.errors.number ? <div className="color-red fw-semibold err-font">{formik.errors.number}</div> : null}
        </div>
      </div>
      <div className="row justify-content-end">
        <button type="submit" className="col-3 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn">
          {' '}
          Next <i class="material-icons-two-tone text-white"> navigate_next</i>{' '}
        </button>
      </div>
    </form>
  );
};

export default Step_One;
