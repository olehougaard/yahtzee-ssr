'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as api from '@/src/api'

export default function Lobby({player}: {player:string}) {
  const router = useRouter()

  useEffect(() => {
    if (player === undefined) {
      router.push("/login")
    }
  }, [player])

  const [number_of_players, set_number_of_players] = useState(2)

  const new_game = (player: string) => {
    api.new_game(number_of_players, player)
  }

  return player && 
    <main>
      Number of players: <input min="1" type="number" value={number_of_players} onChange={e => set_number_of_players(parseInt(e.target.value))}/>
      <button onClick={() => new_game(player)}>New Game</button>
    </main>
}
