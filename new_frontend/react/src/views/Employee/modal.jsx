import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

const EmployeeModal = ({ batchid, onClose, modalemployee, updateSpecificEmployee, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: "",
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone_number: '',
  });

  useEffect(() => {
    if (modalemployee) {
      setFormData({
        name: modalemployee.name,
        email: modalemployee.email,
        phone_number: Number(modalemployee.phone_number)
      });
    }
  }, [modalemployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone_number" ? Number(value) : value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Employee Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.phone_number) formErrors.phone_number = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone_number)) formErrors.phone_number = 'Phone number should be 10 digits';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateSpecificEmployee(modalemployee.batch_id, formData);
      closeModal();
      
      toast.success("Employee Updated Successfully!", {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: true,
        draggable: true,
      });
  };
  }
  const notify = () => toast("Wow so easy!");
  return (
    <>
      <div className="modal fade custom-main-modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="w-100">
          <div className="modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Employee ID {batchid}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
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

                  {/* Phone Number Field */}
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input
                      name="phone_number"
                      type="number"
                      className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                    {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default EmployeeModal;
