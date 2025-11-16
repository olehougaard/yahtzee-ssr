'use client'

import DiceRoll from "../components/DiceRoll"
import ScoreCard from "../components/ScoreCard"
import { is_finished, scores } from "domain/src/model/yahtzee.game"
import * as _ from 'lodash/fp'
import { useEffect } from "react"
import './Game.css'
import { notFound, useRouter } from "next/navigation"
import { useGlobalState } from "./StateProvider"

export default function Game({game_id}: { game_id: string }) {
  const { player, ongoing_games } = useGlobalState()
  const game = ongoing_games.find(_.matches({id: game_id}))
  const router = useRouter()

  if (!game) notFound()

  useEffect(() => {
    if (player === undefined) {
      router.push(`/login?game=${game_id}`)
    } else if (game === undefined) {
      router.push('/')
    }
  })

  if (player === undefined || game === undefined) return <></>

  const enabled = player === game.players[game.playerInTurn]
  const finished = is_finished(game)
  const standings = _.sortBy(_.last, scores(game).map((s, i) => [game.players[i], s]))

  return player && 
    <div className="game">
      <div className="meta">
        <h1>Game #{game_id} </h1>
      </div>
      {game && <ScoreCard className="card" game={game} player={player} enabled={enabled}/>}
      {!finished && <DiceRoll className="roll" game={game!} player={player} enabled={enabled}/>}
      {finished && <div className="scoreboard">
        <table>
          <thead><tr><td key='player'>Player</td><td key='score'>Score</td></tr></thead>
          <tbody>
            {standings.map(row => <tr className={row[0] == player? 'current' : undefined} key={row[0]}><td key='player'>{row[0]}</td><td key='score'>{row[1]}</td></tr>)}
          </tbody>
        </table>
      </div>}
    </div>
}