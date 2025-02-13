import React, { useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Employee_Cards = ({employees, loading}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        <CircularProgress />
      </Box>
    );
  }
  console.log(loading);
  
  return (
<>
      {employees?.length === 0 ? (
        <p className="text-center mt-4">No employees found</p>
      ) : (
        <div className="row mt-4">
          {employees.map((item) => (
            <div key={item.id || item.name} className="col-2 mx-2 mt-2 bg-red-500 card-dashboard">
              <p className="card-dashboard-dept-text mb-0">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Employee_Cards