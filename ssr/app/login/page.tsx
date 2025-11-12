import Login from "@/components/Login"

export default async function loginPage({searchParams}: {searchParams: Promise<{pending?: string, game?: string}>}) {
  const params = await searchParams
  const proceedTo = (params.game !== undefined)?
      `/game/${params.game}`:
    (params.pending !== undefined)?
      `/pending/${params.pending}`:
      '/'

  return <>
    <h1>Login</h1>
    <Login proceedTo={proceedTo}></Login>
  </>
}
