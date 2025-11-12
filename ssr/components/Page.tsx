'use server'

import * as React from 'react'
import { cookies } from 'next/headers'
import { Logout } from './Logout'
import { Navigation } from './Navigation'
import * as api from '@/src/api'

import './Page.css'
import { StateProvider } from './StateProvider'

export async function Page({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies()

  const player = cookieStore.get('player')?.value
  const ongoing_games = await api.games()
  const pending_games = await api.pending_games()

  return <StateProvider player={player} ongoing_games={ongoing_games} pending_games={pending_games}>
      <Logout></Logout>
      <h2 className="subheader">Welcome player {player}&nbsp;</h2>
      <Navigation></Navigation>
      { children }
    </StateProvider>
}
