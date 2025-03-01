import React, { useEffect, useState } from 'react';
import '../../../src/index.css';
import { get_departments } from '../../Api';
const Departments = () => {

const [departments, setDepartments] = useState([]);

useEffect(() => {
  const getDeptData = async() =>{
    const response = await get_departments()
    console.log(response.data)
    setDepartments(response.data)
  }
  getDeptData()
}, [])


  return (
    <>
      <h2 className="fw-normal">Total Departments</h2>
      <div className="row mt-1   ">
        {
          departments.length === 0 ? (
            <div className="">
              <p className="text-center fs-2 text-red">
            Oops !    No Department Found
              </p>
            </div>
          ) : (
            departments?.map((item) => (
              <div className="col-lg-2 col-md-2 total-dept-card-width total-dept-card-margin-top">
                <p className="fw-medium total-dept-card-txt text-white bg-blue text-center card-border p-4 total-dept-card-box-shadow">
                  {item.name}
                </p>
              </div>
            ))
          )
        }
      </div>
    </>
  );
};

export default Departments;