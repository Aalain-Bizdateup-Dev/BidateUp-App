import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";  
import Category_Cards from '../Category_Cards/Category_Cards';
import { getData } from '../..';

const Category_Screen = ({title, input}) => {




  return (
    <div className='container'>
        <div className="d-flex justify-content-between align-items-center mt-5">
            <h2 className='fw-bold custom-font'>{title}</h2>
           <div className="position-relative">
           <FaSearch className= "position-absolute absolute-icon translate-middle fs-5" />

<input type="text" className='custom-input' placeholder={input}/>
           </div>
        </div>
        <Category_Cards />
    </div>
  )
}

export default Category_Screen