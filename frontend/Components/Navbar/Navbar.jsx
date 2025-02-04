import React from 'react'
import logo from "../../src/assets/bizdateup_logo.png"
const Navbar = () => {
  return (
<div className="back-nav">
<nav className='p-4 d-flex justify-content-between align-items-center container' >
<img src={logo} alt="Logo" title='Logo' className=' object-fit-contain' />
<button className='btn-biz fw-bold p-2 mb-0'>Add User</button>
</nav>
</div>
  )
}

export default Navbar