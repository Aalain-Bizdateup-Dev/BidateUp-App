import React, { useState, useEffect } from "react";

const DepartmentRoleSelector = () => {
  // State to hold fetched data
  const [data, setData] = useState([]);
  // State to hold the selected department
  const [selectedDept, setSelectedDept] = useState("");
  // State to hold the roles for the selected department
  const [roles, setRoles] = useState([]);
  // State to hold the selected role
  const [selectedRole, setSelectedRole] = useState("");

  // Simulate fetching data from an API
  useEffect(() => {
    // Mock data: Replace this with an actual API call
    const fetchData = async () => {
      const mockData = [
        { department: "HR", roles: ["Recruiter", "HR Manager"] },
        { department: "Engineering", roles: ["Frontend Developer", "Backend Developer", "DevOps Engineer"] },
        { department: "Sales", roles: ["Sales Executive", "Sales Manager"] },
      ];
      setData(mockData);
    };

    fetchData();
  }, []);

  // Handle department selection
  const handleDeptChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);

    // Find the roles for the selected department
    const selectedDeptData = data.find((item) => item.department === dept);
    if (selectedDeptData) {
      setRoles(selectedDeptData.roles);
      setSelectedRole(selectedDeptData.roles[0]); // Auto-select the first role
    } else {
      setRoles([]);
      setSelectedRole("");
    }
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div>
      <h1>Department and Role Selector</h1>

      {/* Department Dropdown */}
      <label htmlFor="department">Select Department: </label>
      <select id="department" value={selectedDept} onChange={handleDeptChange}>
        <option value="">--Select Department--</option>
        {data.map((dept, index) => (
          <option key={index} value={dept.department}>
            {dept.department}
          </option>
        ))}
      </select>

      <br />
      <br />

      {/* Role Input */}
      <label htmlFor="role">Role: </label>
      <input
        id="role"
        type="text"
        value={selectedRole}
        onChange={handleRoleChange}
        placeholder="Select a department first"
        readOnly // Make it read-only if you don't want the user to edit it
      />

      {/* Optional: Display roles in a dropdown instead of an input */}
      {/* <select id="role" value={selectedRole} onChange={handleRoleChange}>
        <option value="">--Select Role--</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default DepartmentRoleSelector;