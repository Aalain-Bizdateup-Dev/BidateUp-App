import React, { useContext, useState } from 'react'
import ProductTable from '../../components/Widgets/ProductTable'
import productData from 'data/productTableData';
import "../../../src/index.css"
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Tab } from 'bootstrap/dist/js/bootstrap.bundle.min';
import EmployeeModal from './modal';
import "../../../src/index.css"
import New_Employee_Card from './employee-new-card';
const Employee = () => {
  const {allemployees, getModalEmployee, modalemployee, updateSpecificEmployee} = useContext(Employee_Context);

const [tabs, settabs] = useState([{
  name:"All",
  tab:0
},
{
  name:"Tech", tab:1
},
{
  name:"Investor Relation",tab:2
},
{
  name:"Finance",tab:3
},
{
  name:"HR",tab:4
}
]);

const handleDelete = (id) => {
 if(( confirm("Are You Sure You Want To Delete This Employee"))){
  toast.success("Employee Deleted Successfully!");
 }
 else{
  toast.error("Employee Not Deleted!");
 }
};


  return (
    <>



      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} pauseOnHover={true} />

  <h3>BizDateUp  Employees </h3>
  <ul class="nav nav-fill nav-tabs mt-3" role="tablist">
  {
  tabs.map((item, index) => {
    return (
      <li className="nav-item custom-width-tab" role="presentation" key={item.tab}>
        <a 
          className={`nav-link ${index === 0 ? "active" : ""}`} // Ensure the first tab has the "active" class
          id={`fill-tab-${item.tab}`} 
          data-bs-toggle="tab" 
          href={`#fill-tabpanel-${item.tab}`} 
          role="tab" 
          aria-controls={`fill-tabpanel-${item.tab}`} 
          aria-selected={index === 0 ? "true" : "false"} // Mark the first tab as selected
        >
          {item.name}
        </a>
      </li>
    );
  })
}

  {/* <li class="nav-item custom-width-tab" role="presentation">
    <a class="nav-link active" id="fill-tab-0" data-bs-toggle="tab" href="#fill-tabpanel-0" role="tab" aria-controls="fill-tabpanel-0" aria-selected="true"> Tab 1 </a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="fill-tab-1" data-bs-toggle="tab" href="#fill-tabpanel-1" role="tab" aria-controls="fill-tabpanel-1" aria-selected="false"> Tab 2 </a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="fill-tab-2" data-bs-toggle="tab" href="#fill-tabpanel-2" role="tab" aria-controls="fill-tabpanel-2" aria-selected="false"> Tab 3 </a>
  </li> */}

</ul>
<New_Employee_Card/>
<div class="tab-content pt-5" id="tab-content">
  <div class="tab-pane active" id="fill-tabpanel-0" role="tabpanel" aria-labelledby="fill-tab-0">Tab 1 selected</div>
  <div class="tab-pane" id="fill-tabpanel-1" role="tabpanel" aria-labelledby="fill-tab-1">Tab Tab 2 selected</div>
  <div class="tab-pane" id="fill-tabpanel-2" role="tabpanel" aria-labelledby="fill-tab-2">Tab Tab 3 selected</div>
</div>
    
    </>
  )
}

export default Employee
