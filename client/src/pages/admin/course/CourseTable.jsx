import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'




const CourseTable = () => {
  const {data, isLoading} = useGetCreatorCourseQuery();

  const navigate = useNavigate();
  
  

  
  
  
  
  


  
  
  
  return (
    <div className='m-15'>
        <Button onClick={()=> navigate('/admin/course/create')}>Create a new Course</Button>
        <Table className='mt-5'>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course.coursePrice || "NA"}</TableCell>
            <TableCell><Badge>{course.isPublished? "Published" : "Draft"}</Badge></TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="ghost" onClick={() => navigate(`${course._id}`)}><Edit/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
    </div>
  )
}

export default CourseTable