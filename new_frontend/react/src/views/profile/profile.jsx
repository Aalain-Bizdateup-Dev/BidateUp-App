import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../../components/Widgets/Statistic/ProductCard'
import "../../../src/index.css"
const Profile = () => {
  const {allemployees, departmets} = useContext(Employee_Context)

  var totalemployees = allemployees.length;
  var totaldepartments = departmets.length;

  
  return (
<>
<Row>
        <Row>
          <Col sm={6} className=''>
            <ProductCard params={{ title: 'Total Employees', primaryText: totalemployees, icon: 'people', icon_color:"text-white", bg_card_color:"bg-indigo-300", text_color:"text-white", number:true }} />
          </Col>
          <Col sm={6}>
            <ProductCard params={{ variant: 'primary', title: 'Total Departments', primaryText: totaldepartments, icon: 'panorama_wide_angle', icon_color:"text-white", bg_card_color:"bg-red-500", text_color:"text-white",number:true }} />
          </Col>
        </Row>
</Row>

</>
  )
}

export default Profile