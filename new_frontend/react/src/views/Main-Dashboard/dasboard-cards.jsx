import React from 'react'

const Dashboard_cards = ({data}) => {
  console.log(data);
    if (!data || data.length === 0) {
    return <p>No departments available.</p>;  // Show a message if data is empty
  }
  return (
  <>
  
  <div className="row mt-4">
    {
      data.map((item,index)=>(
        <div className="col-2 bg-red-500 card-dashboard">
   <p className='card-dashboard-dept-text mb-0 fw-semibold'>{item.name}</p>
    </div>
      ))
    }
  </div>
  </>
  )
}

export default Dashboard_cards

