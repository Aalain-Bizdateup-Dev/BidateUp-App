const BASE_URL = "http://127.0.0.1:8000";


export const endpoints = {
    create_dept:`${BASE_URL}/create-dept`,
    get_dept:`${BASE_URL}/get-dept`,
    get_dept_by_name:`${BASE_URL}/get-specific-dept`,
    get_all_employees:`${BASE_URL}/get_all_employees`,
    get_specific_employee:`${BASE_URL}/get-specific-emp`,
    update_employee:`${BASE_URL}/update-specific-emp`
}