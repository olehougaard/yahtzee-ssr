'use client'

import * as _ from 'lodash/fp'
import { useEffect } from "react"
import { useGlobalState } from "./StateProvider"
import { useRouter } from "next/navigation"
import * as api from '@/src/api'

export default function Pending({game_id}: {game_id:string}) {
  const router = useRouter()
  
  const { player, ongoing_games, pending_games } = useGlobalState()
  const game = pending_games.find(g => g.id === game_id)

  useEffect(() => {
    if (player === undefined) {
      router.push(`/login?pending=${game_id}`)
    } else if (game === undefined) {
      if (ongoing_games.some(g => g.id === game_id))
        router.push(`/game/${game_id}`)
      else
        router.push('/')
    }
  })

  if (player === undefined || game === undefined)
    return <></>


  const canJoin = game && player && !game.players.some(_.equals(player))

  const join = () => {
    if (canJoin)
      api.join(game, player)
  }

return <>
    <h1>Game #{game_id}</h1>
    <div>Created by: {game?.creator}</div>
    <div>Players: {game?.players.join(', ')}</div>
    <div>Available Seats: { (game?.number_of_players??2) - (game?.players.length??0)}</div>
    {canJoin && <button onClick={join}>Join</button>}
  </>
}
