import React from 'react'
import { Link } from 'react-router-dom'


type Props = {}

export const Navbar = (props: Props) => {
  return (
    <>
    <nav className=' flex justify-between  bg-gray-600 text-white p-3'>
        <div className='my-auto font-bold'><a href="#">
            NEWS PORTAL
        </a></div>
        <div>
            <Link to={'/login'} className='bg-blue-500  font-bold rounded-md py-2 px-2'>
                Login
            </Link>
        </div>
        
    </nav>
    </>
  )
}