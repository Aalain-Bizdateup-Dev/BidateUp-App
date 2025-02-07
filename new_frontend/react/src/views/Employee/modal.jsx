import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../../src/index.css"
const EmployeeModal = ({ batchid }) => {
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
                Employee ID {batchid} and Name is 
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
           
            <div className="modal-footer ">
              <button type="button" className=" border-none submit-btn bg-green-500 w-100">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
