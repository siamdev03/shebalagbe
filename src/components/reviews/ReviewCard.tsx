import Image from 'next/image'
import { Star } from 'lucide-react'
import { ReviewType } from '@/types/review'

interface Props {
  review: ReviewType
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className='bg-white rounded-2xl shadow-lg p-5 border'>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src={review.image}
          alt={review.name}
          width={60}
          height={60}
          className='rounded-full object-cover h-[60px] w-[60px]'
        />

        <div>
          <h3 className='font-bold text-lg'>
            {review.name}
          </h3>

          <div className='flex items-center gap-1'>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className='fill-yellow-400 text-yellow-400'
              />
            ))}
          </div>
        </div>
      </div>

      <p className='text-gray-600 leading-7'>
        {review.review}
      </p>
    </div>
  )
}