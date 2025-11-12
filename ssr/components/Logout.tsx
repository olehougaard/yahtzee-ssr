'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter()

  const logout = () => {
    Cookies.remove('player')
    router.push('/')
  }

  return  <button className='logout' onClick={logout}>Logout</button>
}
