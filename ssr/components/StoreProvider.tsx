'use client'

import { asSpec, IndexedYahtzee, IndexedYahtzeeSpecs } from "@/src/game"
import * as React from "react"
import * as api from '@/src/api'
import * as _ from 'lodash/fp'
import { Provider } from "react-redux"
import { store } from "@/src/store"
import { player_slice } from "@/src/slices/player_slice"
import { ongoing_games_slice } from "@/src/slices/ongoing_games_slice"
import { pending_games_slice } from "@/src/slices/pending_games_slice"

type State = {
  player?: string,
  ongoing_games: Readonly<IndexedYahtzee>[],
  pending_games: Readonly<IndexedYahtzeeSpecs>[]
}

export function StoreProvider(props: State & {children: React.ReactNode}) {
  if (props.player) store.dispatch(player_slice.actions.login(props.player))
  store.dispatch(ongoing_games_slice.actions.reset(props.ongoing_games))
  store.dispatch(pending_games_slice.actions.reset(props.pending_games))

  React.useEffect(() => {
    api.pendingRxJS().subscribe(game => store.dispatch(pending_games_slice.actions.upsert(game)))    
    api.gameRxJS().subscribe(game => store.dispatch(ongoing_games_slice.actions.upsert(game)))
    api.gameRxJS().subscribe(game => store.dispatch(pending_games_slice.actions.delete(asSpec(game))))
  }, [])

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
