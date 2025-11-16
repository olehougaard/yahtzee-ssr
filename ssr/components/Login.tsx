'use client'

import { useEffect, useState, type KeyboardEvent } from "react"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { is_finished } from "domain/src/model/yahtzee.game"
import * as api from '@/src/api'

export default function Login({proceedTo}: {proceedTo: string}) {
  const router = useRouter()

  const [player, setPlayer] = useState('')
  const [gameCount, setGameCount] = useState(0)

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

  useEffect(() => {
    async function updateGameCount() {
      const games = await api.games()
      console.log(games)
      const activeGames = games.filter(g => !is_finished(g))
      setGameCount(activeGames.length)
    }
    updateGameCount()
  })

  return <>
    <p>{gameCount} games playing.</p>
    Username: <input onKeyUp = {loginKeyListener} value={player} onChange={e => setPlayer(e.target.value)}/> <button disabled={!enabled} onClick={login} >Login</button>
    <div></div>
  </>
}
