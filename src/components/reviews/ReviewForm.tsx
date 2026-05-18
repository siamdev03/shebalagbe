'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ReviewForm() {
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!image) return

    setLoading(true)

    const fileName = `${Date.now()}-${image.name}`

    const {
      error: uploadError,
    } = await supabase.storage
      .from('reviews')
      .upload(fileName, image)

    if (uploadError) {
      console.log(uploadError)

      setLoading(false)

      return
    }

    const { data } = supabase.storage
      .from('reviews')
      .getPublicUrl(fileName)

    await supabase
      .from('reviews')
      .insert({
        name,
        review,
        rating,
        image: data.publicUrl,
      })

    setName('')
    setReview('')
    setImage(null)
    setRating(5)
    setLoading(false)

    alert(
      'Review Added Successfully'
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-lg"
    >
      {/* NAME */}

      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
        required
      />

      {/* REVIEW */}

      <textarea
        placeholder="Write Review"
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        className="w-full border p-3 rounded-xl h-[120px]"
        required
      />

      {/* RATING */}

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(e.target.value)
          )
        }
        className="w-full border p-3 rounded-xl"
      >
        <option value={5}>
          5 Star
        </option>

        <option value={4}>
          4 Star
        </option>

        <option value={3}>
          3 Star
        </option>

        <option value={2}>
          2 Star
        </option>

        <option value={1}>
          1 Star
        </option>
      </select>

      {/* IMAGE */}

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(
            e.target.files?.[0] ||
              null
          )
        }
        className="w-full border p-3 rounded-xl"
        required
      />

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold"
      >
        {loading
          ? 'Uploading...'
          : 'Submit Review'}
      </button>
    </form>
  )
}