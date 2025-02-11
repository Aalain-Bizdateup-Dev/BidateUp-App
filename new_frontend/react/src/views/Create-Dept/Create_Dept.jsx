import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "../../../src/index.css"
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/Widgets/Statistic/ProductCard';
const Create_Dept = () => {
  const initialValues = {
    department: '',
    role: ''
  };

  const validate = values => {
    const errors = {};
    if (!values.department) {
      errors.department = 'Department is required';
    }
    if (!values.role) {
      errors.role = 'Role is required';
    }
    return errors;
  };

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div>
      <h3>Create Dept</h3>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div class = "d-flex flex-column"          >
            <label htmlFor="department" className='mb-2 add_employee_label'>Enter Department Name</label>
            <Field
              type="text"
              id="department"
              name="department"
              placeholder="Enter department"
                className="add_Employee_input"
            />
            <ErrorMessage name="department" className='color-red fw-semibold err-font mt-1' component="div" style={{ color: 'red' }} />
          </div>

          <div class = "d-flex flex-column mt-3"  >
            <label htmlFor="role" className='mb-2 add_employee_label'>Enter Role</label>
            <Field
              type="text"
              id="role"
              name="role"
              placeholder="Enter Role" className="add_Employee_input"
            />
            <ErrorMessage name="role" component="div" className='color-red fw-semibold err-font mt-1' style={{ color: 'red' }} />
          </div>

          <button type="submit" className='col-12 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn'>Submit</button>
        </Form>
      </Formik>
<h3 className='mt-4'>Departments</h3>
<Row>
          <Col sm={6} className=''>
            <ProductCard params={{ title: 'Tech', primaryText: 'Developer', icon_color:"text-white", bg_card_color:"bg-indigo-300", text_color:"text-white" }} />
          </Col>
          <Col sm={6}>
            <ProductCard params={{ variant: 'primary', title: 'Total Departments', primaryText: '15,830', icon: 'panorama_wide_angle', icon_color:"text-white", bg_card_color:"bg-red-500", text_color:"text-white" }} />
          </Col>
        </Row>

    </div>
  );
};

export default Create_Dept;
