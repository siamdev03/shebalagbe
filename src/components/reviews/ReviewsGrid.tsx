'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ReviewCard from './ReviewCard'
import { ReviewType } from '@/types/review'

export default function ReviewsGrid() {
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setReviews(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className='text-center py-20'>
        Loading Reviews...
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  )
}