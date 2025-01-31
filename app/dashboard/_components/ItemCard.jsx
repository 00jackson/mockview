import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function ItemCard({ interview }) {

    const router = useRouter();

    const handleStartInterview = () => {
        router.push('/dashboard/interview/' + interview?.mockId)
    }

    const handleFeedback = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
    }
    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview?.JobPosition}</h2>
            <h2 className='text-sm text-gray-700'>{interview?.yearsExperience} years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt}</h2>

            <div className='flex justify-between mt-2 gap-5'>
                <Button size='sm' variant='outline' className='w-full' onClick={handleFeedback}>Feedback</Button>
                <Button size='sm' className='w-full' onClick={handleStartInterview} >Start</Button>
            </div>
        </div>
    )
}
export default ItemCard