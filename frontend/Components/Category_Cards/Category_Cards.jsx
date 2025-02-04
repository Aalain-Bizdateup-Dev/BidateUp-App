import React, { useEffect, useState } from 'react'
import { getData } from '../..';

const Category_Cards = () => {

    const [data, setdata] = useState([]);
    useEffect(() => {
      async function fetchCategory() {
        const data_from_api = await getData();
    setdata(data_from_api)
      }
      fetchCategory()
    }, [])

console.log(data);


  return (
    <>
<div className="mt-4 d-flex justify-content-between flex-wrap ">
{
    data.map((item) =>
        <button className='category_cards mt-2'>
    {item.name}
</button>
    )
}
</div>
    </>
  )
}

export default Category_Cards