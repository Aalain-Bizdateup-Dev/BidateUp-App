import React, { createContext, useEffect, useState } from 'react';
import { fetchAllDepartments, getAllDepartments, getDepartmentEmployees, getSpecificEmployeeModal, updateEmployee,  } from '../../Api';

export const Employee_Context = createContext();

const EmployeeProvider = ({ children }) => {
  const [step, setstep] = useState(0);
  const [departmets, setdepartmets] = useState([]);
  const [employees, setemployees] = useState([]);
  const [allemployees, setallemployees] = useState([])
  const [modalemployee, setmodalemployee] = useState([])
  const [updateemployee, setupdateemployee] = useState([])
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    batch_id: '',
    name: '',
    email: '',
    phone_number: '',
    user_role: '',
    department_role: ''
  });
useEffect(() => {
localStorage.clear()
localStorage.setItem('data', JSON.stringify(formData));
}, [formData])


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
    setLoading(true)
   setTimeout(async() => {
    try {
      const data = await getDepartmentEmployees(name);
      setemployees(data.data);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
   }, 1000);
  };


  const getModalEmployee = async (name) => {
    if (!name) return; 
    setLoading(true)
 
    try {
      const data = await getSpecificEmployeeModal(name);
      setmodalemployee(data.data);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching employees:", error);
    }

  };
  const updateSpecificEmployee = async (name,id) => {
    if (!name) return; 
    setLoading(true)
 
    try {
      const data = await updateEmployee(id,name);
      setupdateemployee(data.data);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching employees:", error);
    }

  };

  return (
    <Employee_Context.Provider value={{ step, setstep, formData, updateFormData, departmets, employees, fetchallemp, allemployees, loading,modalemployee, getModalEmployee, updateSpecificEmployee, updateemployee, setFormData }}>
      {children}
    </Employee_Context.Provider>
  );
};

export default EmployeeProvider;
