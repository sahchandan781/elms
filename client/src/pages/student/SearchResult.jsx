import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
  
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 ml-2'>
        <Link to={`/course-detail/${course._id}`}
        className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
            <img 
            src={course.courseThumbnail} alt="course-thumbnail"
            className='h-32 w-52 md:w-56 object-cover rounded'
            />
            <div className='flex-1 flex-col gap-2'>
              <h1 className='font-bold lext-lg md:text-xl'>{course.courseTitle}</h1>
              <p className='text-sm text-gray-600'>{course.subTitle}</p>
              <p className='text-sm text-gray-700'>Instructor: <span className='font-bold'>{course.creator.name}</span></p>
              <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
            </div>
        </Link>
        <div className='mt-4 md:mt-0 md:text-rigth w-full md:w-auto'>
          <h1 className='font-bold tex-lg md:text-lg'>${course.coursePrice}</h1>
        </div>
    </div>
  )
}

export default SearchResult