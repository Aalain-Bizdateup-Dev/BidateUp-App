import React, { createContext, useEffect, useState } from 'react';
import { fetchAllDepartments } from '../../Api';

// Create the context
export const Employee_Context = createContext();

const EmployeeProvider = ({ children }) => {
  const [step, setstep] = useState(0);
  const [departmets, setdepartmets] = useState(0);
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
 const fetchdatafordropdown = async()=>{
        const data = await fetchAllDepartments();
        setdepartmets(data.data.data);
      }
      fetchdatafordropdown();
  }, [])
  
  return (
    <Employee_Context.Provider value={{ step, setstep, formData, updateFormData,departmets }}>
      {children}
    </Employee_Context.Provider>
  );
};

export default EmployeeProvider;
