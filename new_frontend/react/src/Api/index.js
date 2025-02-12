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
        console.log(response.data);  
        return response.data;  
    } catch (error) {
        console.error("Error fetching department employees:", error);
        return null; 
    }
};

