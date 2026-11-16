'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { player_slice } from '@/src/slices/player_slice'

export function Logout() {
  const router = useRouter()
  const dispatch = useDispatch()

  const logout = () => {
    Cookies.remove('player')
    dispatch(player_slice.actions.logout())
    router.push('/')
  }

  return  <button className='logout' onClick={logout}>Logout</button>
}
