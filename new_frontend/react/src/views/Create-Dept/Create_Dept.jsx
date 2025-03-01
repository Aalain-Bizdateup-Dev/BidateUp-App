import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../../../src/index.css';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/Widgets/Statistic/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
// import { create_Dept, fetchAllDepartments } from '../../Api';
const Create_Dept = () => {
  const initialValues = {
    name: '',
    role: ''
  };
  const [departments, setdepartments] = useState([]);
  const [loading, setloading] = useState(false);
  var getAllDept = async () => {
    if (departments.length === 0) {
      setloading(true);
      const data = await fetchAllDepartments();
      console.log(data);
      setdepartments(data.data.data);
    } else return;
  };
  useEffect(() => {
    getAllDept();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const data = await create_Dept(values);

    const response_number = data.data.status_code;
    const message = data.data.message;
    getAllDept();
    if (response_number === 200) {
      toast.success(message, {
        position: 'top-right'
      });
    } else {
      toast.error(message, {
        position: 'top-right'
      });
    }
    resetForm();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Department is required';
    }
    if (!values.role) {
      errors.role = 'Role is required';
    }
    return errors;
  };

  return (
    <div>
      <h3>Create Dept</h3>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        <Form>
          <div class="d-flex flex-column">
            <label htmlFor="name" className="mb-2 add_employee_label">
              Enter Department Name
            </label>
            <Field type="text" id="name" name="name" placeholder="Enter department" className="add_Employee_input" />
            <ErrorMessage name="name" className="color-red fw-semibold err-font mt-1" component="div" style={{ color: 'red' }} />
          </div>

          <div class="d-flex flex-column mt-3">
            <label htmlFor="role" className="mb-2 add_employee_label">
              Enter Role
            </label>
            <Field type="text" id="role" name="role" placeholder="Enter Role" className="add_Employee_input" />
            <ErrorMessage name="role" component="div" className="color-red fw-semibold err-font mt-1" style={{ color: 'red' }} />
          </div>

          <button type="submit" className="col-12 justify-content-end mt-4 bg-blue-500 text-white px-3 py-1 rounded custom-table-btn">
            Submit
          </button>
        </Form>
      </Formik>
      <h3 className="mt-4">Departments</h3>

      {loading ? (
        <Row>
          {departments?.map((dept) => {
            return (
              <Col sm={6} className="" key={dept.id}>
                <ProductCard
                  params={{
                    title: dept.name,
                    primaryText: dept.role, // Assuming dept.name is the text you want to display
                    icon_color: 'text-gray',
                    bg_card_color: 'bg-pink-300 ',
                    text_color: 'text-gray',
                    type: 'true',
                    number: true
                  }}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>Loading</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Create_Dept;
