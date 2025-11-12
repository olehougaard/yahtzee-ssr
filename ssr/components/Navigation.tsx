'use client'

import Link from 'next/link'

import * as _ from 'lodash/fp'
import { is_finished } from 'domain/src/model/yahtzee.game'
import { IndexedYahtzee, IndexedYahtzeeSpecs } from '@/src/game'

type Props = {
  player: string
  ongoing_games: Readonly<IndexedYahtzee>[]
  pending_games: Readonly<IndexedYahtzeeSpecs>[]
}

export function Navigation({player, ongoing_games, pending_games}: Props) {
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
