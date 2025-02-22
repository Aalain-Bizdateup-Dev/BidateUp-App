import React from 'react';
import '../../../src/index.css';
const Departments = () => {
  const data = [
    { name: 'HR' },
    { name: 'Department 2' },
    { name: 'Investor Relations' },
    { name: 'CEO' },
    { name: 'Finance' },
    { name: 'Director' },
    { name: 'Marketing' },
    { name: 'Sales' },
    { name: 'Operations' },
    { name: 'Customer Support' },
    { name: 'IT' },
    { name: 'Product Management' },
    { name: 'Legal' },
    { name: 'Research & Development' },
    { name: 'Business Development' },
    { name: 'Procurement' },
    { name: 'Public Relations' },
    { name: 'Compliance' },
    { name: 'Administration' },
    { name: 'Security' },
    { name: 'Security' },
    { name: 'Security' },
    { name: 'Security' },
    { name: 'Security' },
    { name: 'Security' }
  ];

  return (
    <>
      <h2 className="fw-normal">Total Departments</h2>
      <div className="row mt-1   justify-content-between  align-items-center">
        {data.map((item) => (
          <div className="col-lg-2 col-md-2 total-dept-card-width total-dept-card-margin-top">
            <p className="fw-medium total-dept-card-txt text-white bg-blue text-center card-border p-4 total-dept-card-box-shadow">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Departments;