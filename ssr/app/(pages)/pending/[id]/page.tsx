import * as _ from 'lodash/fp'
import Pending from "@/components/Pending"

export default async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params

  return <Pending id={id}></Pending>
}
