import Pending from "@/components/Pending"

export default async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params

  return <Pending game_id={id}></Pending>
}
