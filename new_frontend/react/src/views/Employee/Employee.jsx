import React, { useContext, useState } from 'react'
import ProductTable from '../../components/Widgets/ProductTable'
import productData from 'data/productTableData';
import "../../../src/index.css"
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import EmployeeModal from './modal';
import { Employee_Context } from '../Add_Employee/employee_context';

const Employee = () => {
  const {allemployees, getModalEmployee, modalemployee, updateSpecificEmployee} = useContext(Employee_Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchId, setBatchId] = useState(null);


// Handle Delete Function
const handleDelete = (id) => {
 if(( confirm("Are You Sure You Want To Delete This Employee"))){
  toast.success("Employee Deleted Successfully!");
 }
 else{
  toast.error("Employee Not Deleted!");
 }
};

const handleEdit = (id) => {
  setBatchId(id); 
  getModalEmployee(id)
};

const closeModal = () => {
  setIsModalOpen(false)
}
  return (
    <>
  <div className="p-4 bg-gray-100 box-shdow-back overflow-x-auto
">

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} pauseOnHover={true} />

  <h3>BizDateUp  Employees </h3>
  <div className='d-flex justify-content-between mb-4 align-items-center'>
<div className='position-relative'>
  <i className='fa fa-search search-icon position-absolute position-type fs-5'></i>
<input type="text" placeholder='Search Employee Name' className='border-none outline-none input-padding employe-input-border w-100' />
</div>
   <div className='d-flex align-items-end justify-content-center flex-column'>
    <p className='mb-0 text-capitalize text-left fs-5 mb-2 fw-bold'>Filter By department</p>
    <select name="Filter" id="" className='w-100 cursor-pointer bg-white border-none outline-none fs-6 p-1 cursor-pointer'>
      <option value="" className='cursor-pointer' >Test 1</option>
      <option value="" className='cursor-pointer' >Test 2</option>
    </select>
   </div>
  </div>
<table className="w-100 bg-white">
  <thead>
    <tr className="bg-gray-200 text-left border-radius ">
      <th className="px-4 py-2  py-3 custom-text">Batch ID</th>
      <th className="px-4 py-2  py-3 custom-text">Name</th>
      <th className="px-4 py-2  py-3 custom-text">Dept</th>
      <th className="px-4 py-2  py-3 custom-text">Mobile</th>
      <th className="px-4 py-2  py-3 custom-text">Email</th>
      <th className="px-4 py-2  py-3 custom-text">Role</th>
      <th className="px-4 py-2  py-3 custom-text">Actions</th>
    </tr>
  </thead>
  <tbody>

    {allemployees.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100 ">
        <td className="px-4 py-3 custom-text">{item.batch_id}</td>
        <td className="px-4 py-3  custom-text">{item.name}</td>
        <td className="px-4 py-3 custom-text">{item.department_name}</td>
        <td className="px-4 py-3 custom-text">{item.phone_number}</td>
        <td className="px-4 py-3 custom-text">{item.email}</td>
        <td className="px-4 py-3 custom-text">{item.user_role}</td>
        <td className="px-4 py-2 custom-text flex gap-2 justify-content-center align-items-center">
          
          <button className="bg-blue-500 text-white px-3 py-1 rounded custom-table-btn mx-4 mb-3"  onClick={() => handleEdit(item.batch_id)} data-bs-toggle="modal"
        data-bs-target="#exampleModal">Edit</button>
         <EmployeeModal batchid={batchId} modalemployee = {modalemployee} updateSpecificEmployee = {updateSpecificEmployee} closeModal = {closeModal}/>
          <button className="bg-red-500 text-white px-3 py-1 rounded mx-3 custom-table-btn mx-4 mb-3" onClick={()=>handleDelete(item.batch_id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>


    
    </>
  )
}

export default Employee
