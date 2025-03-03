import React from 'react'
import "../../../src/index.css"
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import img from "./user.png"
const New_Employee_Card = ({department}) => {
  return (
<>
<div className="row">
    <div className="col-2 bg-white p-3 border-radius-card card-on-hover">
        <img src={img}  alt="" className="custom-image-icon" />
       <div className="d-flex flex-row align-items-center justify-content-between mt-2">
       <p className='card-txt mt-2 mb-0'>{department}</p>
      <div className="d-flex gap-10">
      <FaEye  className="card-icon" />
        <FaRegEdit  className="card-icon" />
        <MdOutlineDeleteForever className="card-icon" /> 
      </div>
      </div>
    </div>

</div>

</> 
  )
}

export default New_Employee_Card