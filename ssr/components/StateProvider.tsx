'use client'

import { IndexedYahtzee, IndexedYahtzeeSpecs } from "@/src/game"
import * as React from "react"
import { createContext } from "react"
import * as api from '@/src/api'
import * as _ from 'lodash/fp'

type State = {
  player?: string,
  ongoing_games: Readonly<IndexedYahtzee>[],
  pending_games: Readonly<IndexedYahtzeeSpecs>[]
}

type MutableState = State & {
  set_player: (player: string | undefined) => void,
}

const StateContext = createContext<MutableState>({ongoing_games: [], pending_games: [], set_player(player) {this.player = player}})

const sameId = (x: { id: string}) => (y: { id: string}) => x.id === y.id

const upsert = <T extends {id: string}>(t: T) => (ts: T[]): T[] => {
  const idx = ts.findIndex(sameId(t))
  if (idx == -1)
    return [...ts, t]
  else
    return _.set(idx, t, ts)
}

const remove = <T extends {id: string}>(t: {id: string}) => (ts: T[]): T[] => _.remove(sameId(t), ts)

export const useGlobalState = (): MutableState => React.useContext(StateContext)!

export function StateProvider(props: State & {children: React.ReactNode}) {
  const [player, set_player] = React.useState(props.player)
  const [ongoing_games, set_ongoing_games] = React.useState(props.ongoing_games)
  const [pending_games, set_pending_games] = React.useState(props.pending_games)

  React.useEffect(() => {
    api.pendingRxJS().subscribe(game => set_pending_games(upsert(game)))
    
    api.gameRxJS().subscribe(game => set_ongoing_games(upsert(game)))

    api.gameRxJS().subscribe(game => set_pending_games(remove(game)))
  }, [])

  return (
    <StateContext value = {{player, set_player, ongoing_games, pending_games}}>
      {props.children}
    </StateContext>
  )
}
