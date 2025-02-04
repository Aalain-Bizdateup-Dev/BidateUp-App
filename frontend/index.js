import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000";

 export const endPoints = {
  get_dept: `${BASE_URL}/get_all_dept`,
};

export const getData = async function getData() {
    try {
      const response = await axios.get(endPoints.get_dept);
   return response.data
    } catch (error) {
      console.error(error);
    }
  }