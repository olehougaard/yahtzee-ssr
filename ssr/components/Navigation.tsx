'use client'

import Link from 'next/link'

import * as _ from 'lodash/fp'
import { is_finished } from 'domain/src/model/yahtzee.game'
import { IndexedYahtzee, IndexedYahtzeeSpecs } from '@/src/game'
import { useEffect, useState } from 'react'
import * as api from '@/src/api'
import { filter, map } from 'rxjs'

type Props = {
  player: string
  ongoing_games: Readonly<IndexedYahtzee>[]
  pending_games: Readonly<IndexedYahtzeeSpecs>[]
}

export function Navigation({player, ongoing_games, pending_games}: Props) {
  const is_participant = (g: {players: readonly string[]}) => g.players.some(_.isEqual(player))

  const [my_ongoing_games, set_my_ongoing_games] = useState(ongoing_games.filter(is_participant).filter(_.negate(is_finished)))
  const [all_pending_games, set_pending_games] = useState(pending_games)
  const my_pending_games = all_pending_games.filter(is_participant)
  const other_pending_games = all_pending_games.filter(_.negate(is_participant))

  const findIndex = <T, U>(pred: (element: T) => (other: U) => boolean, ts: U[]) => (element: T) => ({ element, idx: ts.findIndex(pred(element))})
  const sameId = <T extends unknown>(x: { id: T}) => (y: { id: T}) => x.id === y.id

  useEffect(() => {
    const updatedPending = api.pendingRxJS().pipe(
      map(findIndex(sameId, all_pending_games)),
      filter(({ idx }) => idx !== -1)
    )
    
    const updatedOngoing = api.gameRxJS().pipe(
      map(findIndex(sameId, my_ongoing_games)),
      filter(({ idx }) => idx !== -1)
    )

    const newOngoing = api.gameRxJS().pipe(
      map(findIndex(sameId, my_ongoing_games)),
      filter(({ idx }) => idx === -1)
    )

    const newPending = api.pendingRxJS().pipe(
      map(findIndex(sameId, all_pending_games)),
      filter(({ idx }) => idx === -1)
    )
    
    const started = api.gameRxJS().pipe(
      map(findIndex(sameId, all_pending_games)),
      filter(({ idx }) => idx !== -1)
    )
    
    updatedPending.subscribe(
      ({element, idx}) => set_pending_games(_.set(idx,  element, all_pending_games))
    )

    updatedOngoing.subscribe(
      ({element, idx}) => set_my_ongoing_games(_.set(idx,  element, my_ongoing_games))
    )

    newPending.subscribe(
      ({element}) => set_pending_games(_.concat(all_pending_games, element))
    )

    newOngoing.subscribe(
      ({element}) => {
        if (is_participant(element))
          set_my_ongoing_games(_.concat(my_ongoing_games, element))
      }
    )

    started.subscribe(
      ({element, idx}) => {
        set_pending_games(_.unset(idx, all_pending_games))
        if (is_participant(element))
          set_my_ongoing_games(_.concat(my_ongoing_games, element))
      }
    )
  }, [])

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
