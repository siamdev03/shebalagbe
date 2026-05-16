import ReviewsGrid from '@/components/reviews/ReviewsGrid'
import ReviewForm from '@/components/reviews/ReviewForm'

export default function ReviewsPage() {
  return (
    <section className='max-w-7xl mx-auto px-4 py-20'>
      <div className='text-center mb-14'>
        <h1 className='text-4xl font-bold'>
          Real Client Reviews ⭐
        </h1>

        <p className='text-gray-500 mt-4'>
          What our clients say about us.
        </p>
      </div>

      <div className='grid lg:grid-cols-3 gap-10'>
        <div>
          <ReviewForm />
        </div>

        <div className='lg:col-span-2'>
          <ReviewsGrid />
        </div>
      </div>
    </section>
  )
}