import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductCard from '../../components/Widgets/Statistic/ProductCard'
import "../../../src/index.css"
const Profile = () => {
  return (
<>
<Row>

        <Row>
          <Col sm={6} className=''>
            <ProductCard params={{ title: 'Total Employees', primaryText: '$1,783', icon: 'people', icon_color:"text-white", bg_card_color:"bg-indigo-300", text_color:"text-white" }} />
          </Col>
          <Col sm={6}>
            <ProductCard params={{ variant: 'primary', title: 'Total Departments', primaryText: '15,830', icon: 'panorama_wide_angle', icon_color:"text-white", bg_card_color:"bg-red-500", text_color:"text-white" }} />
          </Col>
        </Row>
</Row>

</>
  )
}

export default Profile