'use server'

import * as React from 'react'
import { cookies } from 'next/headers'
import { Logout } from './Logout'
import { Navigation } from './Navigation'

import './Page.css'

export async function Page({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies()

  const player = cookieStore.get('player')?.value

  return player && <>
    <Logout></Logout>
    <h2 className="subheader">Welcome player {player}&nbsp;</h2>
    <Navigation player={player}></Navigation>
    {children}
  </>
}
