import React, { useEffect, useState } from 'react'
import { get_departments } from '../../Api'
import { FaSearch } from "react-icons/fa";

const Select_Dept = () => {
  const [data, setData] = useState([]); 
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
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
  }

  // Fetch departments from the API
  const getDepartments = async () => {
    const response = await get_departments();
    setData(response.data);
    setFilteredUsers(response.data); 
  }

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <>
      <h1>Select Departments</h1>
      <div className="d-flex ">
        <FaSearch className="position-absolute search-float" />
        <input
          type="text"
          className="border-none select-dept-input"
          placeholder="Search dept...."
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>

      <div className="row flex-row">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item) => (
            <div key={item.id} className="col-xl-2 col-md-6 col-lg-6 blue-dept-card m-3">
              <h2 className="text-center text-white mb-0 text-for-card">{item.name}</h2>
              <button className="w-100 mt-5 text-center border-none select-btn">Select</button>
            </div>
          ))
        ) : (
          <p className='text-center text-red fs-1'>No departments found</p>
        )}
      </div>
    </>
  );
}

export default Select_Dept;
