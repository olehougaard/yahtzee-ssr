'use client'

import { useState, type KeyboardEvent } from "react"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Login({proceedTo}: {proceedTo: string}) {
  const router = useRouter()

  const [player, setPlayer] = useState('')

  const enabled = player !== ''

  function login() {
    Cookies.set('player', player)
    router.push(proceedTo)
  }
   
  const loginKeyListener = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (enabled) login()
    }
  }

  return <>
    Username: <input onKeyUp = {loginKeyListener} value={player} onChange={e => setPlayer(e.target.value)}/> <button disabled={!enabled} onClick={login} >Login</button>
    <div></div>
  </>
}
