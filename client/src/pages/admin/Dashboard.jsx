import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Dashboard