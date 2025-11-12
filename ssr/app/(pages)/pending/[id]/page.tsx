import Pending from "@/components/Pending"

export default async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params

  return <Pending id={id}></Pending>
}
