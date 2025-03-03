import React, { useEffect, useState } from 'react';
import New_Employee_Card from './employee-new-card';
import { get_departments } from '../../Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState(0); 

  useEffect(() => {
    const getDeptData = async () => {
      try {
        const response = await get_departments();
        if (response.data) {
          const updatedData = response.data.map((item, index) => ({
            ...item,
            tab: item.id, 
          }));
          setDepartments(updatedData);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    getDeptData();
  }, []);
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar pauseOnHover />
      <h3>BizDateUp Employees</h3>

      {/* Tabs Navigation */}
      <ul className="nav nav-fill nav-tabs mt-3" role="tablist">
        {departments.map((item, index) => (
          <li className="nav-item custom-width-tab" role="presentation" key={item.tab}>
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content pt-5">
        {departments.map((item, index) => (
          <div
            key={item.tab}
            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
          >
            <New_Employee_Card department={item.name} />
            <p>Department ID: {item.tab}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Employee;
