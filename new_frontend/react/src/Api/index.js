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