'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useGlobalState } from './StateProvider'

export function Logout() {
  const router = useRouter()
  const { set_player } = useGlobalState()

  const logout = () => {
    Cookies.remove('player')
    set_player(undefined)
    router.push('/')
  }

  return  <button className='logout' onClick={logout}>Logout</button>
}
