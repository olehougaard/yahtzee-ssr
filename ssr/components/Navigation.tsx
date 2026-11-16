'use client'

import Link from 'next/link'

import * as _ from 'lodash/fp'
import { is_finished } from 'domain/src/model/yahtzee.game'
import { useSelector } from 'react-redux'
import { State } from '@/src/store'

export function Navigation() {
  const player = useSelector((s: State) => s.player).player
  const ongoing_games = useSelector((s: State) => s.ongoing_games)
  const pending_games = useSelector((s: State) => s.pending_games)
  
  const is_participant = (g: {players: readonly string[]}) => g.players.some(_.isEqual(player))

  const my_ongoing_games = ongoing_games.filter(is_participant).filter(_.negate(is_finished))
  const my_pending_games = pending_games.filter(is_participant)
  const other_pending_games = pending_games.filter(_.negate(is_participant))

  return  <nav>
      <Link className='link' href="/">Lobby</Link>

      <h2>My Games</h2>

      <h3>Ongoing</h3>

      {my_ongoing_games.map(game => <Link className='link' href={`/game/${game.id}`} key={game.id}>Game #{game.id}</Link>)}

      <h3>Waiting for players</h3>

      {my_pending_games.map(game => <Link className='link' href={`/pending/${game.id}`} key={game.id}>Game #{game.id}</Link>)}

      <h2>Available Games</h2>
      {other_pending_games.map(game => <Link className='link' href={`/pending/${game.id}`} key={game.id}>Game #{game.id}</Link>)} 

    </nav>
}
