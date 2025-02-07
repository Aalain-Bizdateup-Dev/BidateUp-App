import React from 'react'
import ProductTable from '../../components/Widgets/ProductTable'
import productData from 'data/productTableData';
import "../../../src/index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Employee = () => {
  const notify = () => toast("Wow so easy!");
  const alldata = [
    { id:1,
      name:"Aalain",
      Dept:"Tech",
      mobile:1234,
      email:"a@gmail.com",
      role:"Web Developer"
    },
    { id:1,
      name:"Aalain",
      Dept:"Tech",
      mobile:1234,
      email:"a@gmail.com",
      role:"Web Developer"
    },
    { id:1,
      name:"Aalain",
      Dept:"Tech",
      mobile:1234,
      email:"a@gmail.com",
      role:"Web Developer"
    }
  ]
  return (
    <>
  <div className="p-4 bg-gray-100 box-shdow-back
">


<div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



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
    {alldata.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100 ">
        <td className="px-4 py-3 custom-text">{item.id}</td>
        <td className="px-4 py-3  custom-text">{item.name}</td>
        <td className="px-4 py-3 custom-text">{item.Dept}</td>
        <td className="px-4 py-3 custom-text">{item.mobile}</td>
        <td className="px-4 py-3 custom-text">{item.email}</td>
        <td className="px-4 py-3 custom-text">{item.role}</td>
        <td className="px-4 py-2 custom-text flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded custom-table-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(item.id)}>Edit</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded mx-3 custom-table-btn">Delete</button>
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
