import React, { useEffect, useState } from 'react';
import New_Employee_Card from './employee-new-card';
import { get_departments, get_department_members } from '../../Api'; // Ensure you have this function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getDeptData = async () => {
      try {
        const response = await get_departments();
        if (response.data) {
          setDepartments(response.data);
          if (response.data.length > 0) {
            fetchMembers(response.data[0].id); 
          }
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    getDeptData();
  }, []);

  const fetchMembers = async (deptId) => {
    try {
      const response = await get_employee(deptId);
      
      setMembers(response.data || []);
    } catch (error) {
      console.error(`Error fetching members for department ${deptId}:`, error);
      setMembers([]);
    }
  };

  const handleTabClick = (index, deptId) => {
    console.log("Clicked");
    
    setActiveTab(index);
    fetchMembers(deptId); 
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar pauseOnHover />
      <h3>BizDateUp Employees</h3>


      <ul className="nav nav-fill nav-tabs mt-3" role="tablist">
        {departments.map((item, index) => (
          <li className="nav-item custom-width-tab" role="presentation" key={item.id}>
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index, item.name)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-5">
        {departments.map((item, index) => (
          <div
            key={item.id}
            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
          >
            <New_Employee_Card department={item.name} members={members} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Employee;
