import { endpoints } from './api_endpoints'
import axios from 'axios';

export const create_Dept = async(department_data)=>{
    const data = await axios.post(endpoints.create_dept, department_data)
    const response =  data
     return response
}

export const fetchAllDepartments = async()=>{
 const data = await axios.get(endpoints.get_dept)
return data
}


export const getDepartmentEmployees = async (dept_name) => {
    try {
        const response = await axios.get(`${endpoints.get_dept_by_name}/${dept_name}`);
        return response.data;  
    } catch (error) {
        console.error("Error fetching department employees:", error);
        return null; 
    }
};
// Get All DEpartments Api Call
export const getAllDepartments = async()=>{
    const data = await axios.get(endpoints.get_all_employees)
   return data
   }
   export const getSpecificEmployeeModal = async (dept_name) => {
    try {
        const response = await axios.get(`${endpoints.get_specific_employee}/${dept_name}`);
        return response.data;  
    } catch (error) {
        console.error("Error fetching  Specific Modal Employee:", error);
        return null; 
    }
};   
// Update Employee Data
export const updateEmployee = async(department_data,id)=>{
    const data = await axios.put(`${endpoints.update_employee}/${id}`, department_data)
    const response =  data
     return response
}

// Add Employee Personal Details
export const addEmployee = async(employee_data)=>{
    const data = await axios.post(endpoints.add_employee, employee_data)
    const response =  data
     return response
}




// Other
export const add_department = async (data) => {
    const response = await axios.post(endpoints.create_dept, data);
    if( response.status === 200){
        return response.data
    }
    return response.data
 
}
export const get_departments = async () => {
    const response = await axios.get(endpoints.get_dept);
    return response
}
export const add_employee = async (data) => {
    const response = await axios.post(endpoints.add_employee, data);
    if( response.status === 200){
        return response.data
    }
    return response.data
}
