import { BookData } from '@/types'

export default async function fetchOneBook(
  id: number,
): Promise<BookData | null> {
  const url = `https://onebite-books-server-navy-eight.vercel.app/book/${id}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error()
    }
    return await response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}
