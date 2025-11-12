import Game from "@/components/Game"

export default async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params

  return <Game game_id={id}></Game>
}
