import React, { createContext, useEffect, useState } from 'react';
import { fetchAllDepartments, getAllDepartments, getDepartmentEmployees } from '../../Api';

export const Employee_Context = createContext();

const EmployeeProvider = ({ children }) => {
  const [step, setstep] = useState(0);
  const [departmets, setdepartmets] = useState([]);
  const [employees, setemployees] = useState([]);
  const [allemployees, setallemployees] = useState([])
  const [formData, setFormData] = useState({
    batchid: '',
    name: '',
    email: '',
    number: '',
    role: '',
    dept: ''
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  useEffect(() => {
    const fetchDataForDropdown = async () => {
      try {
        const response = await fetchAllDepartments();
        setdepartmets(response.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDataForDropdown();
  }, []);

  useEffect(() => {
  const fetchAllEmployee = async()=>{
   try{
    const data = await getAllDepartments()
    setallemployees(data.data.data)
   }
   catch (error) {
    console.error("Error fetching employees:", error);  
  }}
  fetchAllEmployee()
  }, [])
  

  const fetchallemp = async (name) => {
    if (!name) return; 
    try {
      const data = await getDepartmentEmployees(name);
      setemployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
 
  

  return (
    <Employee_Context.Provider value={{ step, setstep, formData, updateFormData, departmets, employees, fetchallemp, allemployees }}>
      {children}
    </Employee_Context.Provider>
  );
};

export default EmployeeProvider;
