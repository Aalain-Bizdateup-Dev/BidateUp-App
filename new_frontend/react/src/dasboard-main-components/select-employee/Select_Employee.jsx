import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get_employee } from '../../Api';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Select_Employee = () => {
  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
    const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if (searchTerm === '') {
      setFilteredUsers(data); 
    } else {
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredItems); 
    }
  };
  const getDepartments = async (name) => {
    try {
      const response = await get_employee(name);
      console.log(response);
      console.log(response);
      
      setData(response.data);   
      setFilteredUsers(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees."); 
      setLoading(false);
    }
  };
console.log(filteredUsers);

  useEffect(() => {
    setLoading(true); 
    getDepartments(id);  
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>;  
  }

  if (error) {
    return <p className="text-red">{error}</p>;  
  }
  return (
    <>
      <h1>Select Employees</h1>
      <div className="d-flex ">
        <FaSearch className="position-absolute search-float" />
        <input
          type="text"
          className="border-none select-dept-input"
          placeholder="Search employees...."
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>

      <div className="row flex-row">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((item) => (
            <div key={item.id} className="col-xl-2 col-md-6 col-lg-6 blue-dept-card m-3">
              <h2 className="text-center text-white mb-0 text-for-card">{item.name}</h2>
              <Link to={`/employee/${item.id}`}> 
                <button className="w-100 mt-5 text-center border-none select-btn">
                  Select
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-red fs-1">No employees found</p>
        )}
      </div>
    </>
  );
};

export default Select_Employee;
