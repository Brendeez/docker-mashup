import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillTwitterCircle } from 'react-icons/ai';
const TwitterButton = ({ itemdata }) => {
    console.log(" twitter item Data: ", itemdata);
  return (
    <div className='flex'>
    <Link
      to="/twitter"
      state= {{itemdata}}
      className='bg-sky-800 hover:bg-red-400 text-white px-4 py-1 rounded-lg w-fit'
    >
      <AiFillTwitterCircle className='text-2xl' />
    </Link>
    {/* <Link to={`/other?keyword=${keyword}`}>Go to Other Page</Link>  */}
  </div>
  )
}

export default TwitterButton