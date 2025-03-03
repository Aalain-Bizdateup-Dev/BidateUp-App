import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get_employee } from '../../Api';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Select_Employee = () => {
  const { id } = useParams();  // Get department name from URL params
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
console.log(data);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if (searchTerm === '') {
      setFilteredUsers(data); // Reset the filtered list when search term is empty
    } else {
      const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filteredItems); // Filter the data based on the search term
    }
  };

  // Fetch employees based on department
  const getDepartments = async (name) => {
    try {
      const response = await get_employee(name);
      setData(response.data);   // Set all employee data
      setFilteredUsers(response.data); // Set filtered users to all data initially
      setLoading(false);  // Stop loading once the data is fetched
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees."); // Set error message if the request fails
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);  // Set loading state to true before making API request
    getDepartments(id);  // Fetch employees when the component mounts or `id` changes
  }, [id]);  // Add `id` as a dependency to refetch data if department changes

  if (loading) {
    return <p>Loading...</p>;  // Show loading message until data is fetched
  }

  if (error) {
    return <p className="text-red">{error}</p>;  // Show error if there's an issue with the API call
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
              <Link to={`/employee/${item.id}`}> {/* Navigate using the employee id */}
                <button className="w-100 mt-5 text-center border-none select-btn">
                  Select
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-red fs-1">No employees found</p> // Message if no employees found
        )}
      </div>
    </>
  );
};

export default Select_Employee;
