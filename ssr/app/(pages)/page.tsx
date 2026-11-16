'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as api from '@/src/api'
import { useSelector } from "react-redux";
import { State } from "@/src/store";

export default function Home() {
  const playerState = useSelector((s: State) => s.player)
  const router = useRouter()

  useEffect(() => {
    if (playerState.player === undefined) {
      router.push('/login')
    }
  }, [playerState])

  const [number_of_players, set_number_of_players] = useState(2)

  const new_game = async (player: string) => {
    const {id} = await api.new_game(number_of_players, player)
    router.push(`/pending/${id}`)
  }

  return playerState.player && 
    <main>
      Number of players: <input min="1" type="number" value={number_of_players} onChange={e => set_number_of_players(parseInt(e.target.value))}/>
      <button onClick={() => new_game(playerState.player!)}>New Game</button>
    </main>
}
