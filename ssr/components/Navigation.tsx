'use client'

import Link from 'next/link'
// import type { State } from '../stores/store'
// import type { PlayerState } from '../slices/player_slice'
// import type { OngoingGamesState } from '../slices/ongoing_games_slice'
// import type { PendingGamesState } from '../slices/pending_games_slice'
// import * as _ from 'lodash/fp'
// import { is_finished } from 'domain/src/model/yahtzee.game'

export function Navigation({player}: {player: string}) {
  // const ongoing_games = useSelector<State, OngoingGamesState>(state => state.ongoing_games)
  // const pending_games = useSelector<State, PendingGamesState>(state => state.pending_games)

  // const is_participant = (g: {players: readonly string[]}) => g.players.some(_.isEqual(player))

  // const my_ongoing_games = ongoing_games.filter(is_participant).filter(_.negate(is_finished))
  // const my_pending_games = pending_games.filter(is_participant)
  // const other_pending_games = pending_games.filter(_.negate(is_participant))

  return  <nav>
      <Link className='link' href="/">Lobby</Link>

      <h2>My Games</h2>

      <h3>Ongoing</h3>

      <h3>Waiting for players</h3>

      <h2>Available Games</h2>
      {/* 
      
      {my_ongoing_games.map(game => <Link className='link' to={`/game/${game.id}`} key={game.id}>Game #{game.id}</Link>)}
      
      {my_pending_games.map(game => <Link className='link' to={`/pending/${game.id}`} key={game.id}>Game #{game.id}</Link>)}
      
      {other_pending_games.map(game => <Link className='link' to={`/pending/${game.id}`} key={game.id}>Game #{game.id}</Link>)} */}
    </nav>
}
