import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeModal = ({ batchid, onClose }) => {
  // State to store the form data and errors

const [modal, setmodal] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Basic form validation
  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Employee Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.mobile) formErrors.mobile = 'Mobile is required';
    else if (!/^[0-9]{10}$/.test(formData.mobile)) formErrors.mobile = 'Mobile number should be 10 digits';
   

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    setmodal(false);
     formData.name = '';
      formData.email = '';
      formData.mobile = '';
    toast.success("Employee Updated Successfully")
    }
  };

  return (
    <div
      className="modal fade custom-main-modal"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="w-100">
        <div className="modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Employee ID {batchid}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Employee Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Employee Name</label>
                  <input
                    name="name"
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Department Field */}
               

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Mobile Field */}
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    name="mobile"
                    type="text"
                    className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>

                {/* Role Field */}
               
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit " 
                disabled = {modal}
                className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default EmployeeModal;
