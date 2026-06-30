import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!res.ok) {
    // Attempt to parse error message from API
    let errorMessage = `API Error: ${res.statusText}`
    try {
      const errorData = await res.json()
      errorMessage = errorData.message || errorMessage
    } catch (e) {
      // Ignore JSON parse errors for non-JSON responses
    }
    throw new Error(errorMessage)
  }

  // Handle empty responses (like DELETE)
  if (res.status === 204) {
    return null
  }

  return res.json()
}
