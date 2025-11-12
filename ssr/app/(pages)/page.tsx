import Lobby from "@/components/Lobby";
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const player = cookieStore.get('player')?.value

  return (
    <Lobby player={player}></Lobby>
  )
}
