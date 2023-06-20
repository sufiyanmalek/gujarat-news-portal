import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    news:any
}

const NewsTab = ({news}: Props) => {
  return (
    <div className='rounded-md p-2 cursor-pointer bg-red-400'>
    <div className='flex h-52 gap-1' >
        <img src={news.image} width={200} alt="" className='rounded-md' />
        <div className='p-2 rounded-md flex-1  relative bg-gray-100'>
            <div className='flex justify-between'>
                <p><strong>{news.title}</strong></p>
                <p className='font-bold text-green-700 text-sm'>{news.category}</p>
            </div>
            <p className='font-medium text-gray-700'>{news.desc.substring(0,200)}{news.desc.length>100? "..." : ""}</p>
            <p className='absolute bottom-0'><span className='font-medium'>Reporter : </span > {news.reporterName}</p>
        </div>
    </div>
    <div className='  my-1 bg-blue-800 text-white p-1 rounded-md hover:bg-blue-700' >
        <Link to={`/news/${news._id}`} className='font-bold  block text-center'>Show More {">>>"}</Link>
    </div>
    </div>
  )
}



export default NewsTab