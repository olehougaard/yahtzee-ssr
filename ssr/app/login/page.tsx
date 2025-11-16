import Login from "@/components/Login"

export default async function loginPage() {
  const searchParams = new URLSearchParams()
  const proceedTo = (searchParams.get('game') !== null)?
      `/game/${searchParams.get('game')}`:
    (searchParams.get('pending') !== undefined)?
      `/pending/${searchParams.get('pending')}`:
      '/'

  return <>
    <h2>Login</h2>
    <Login proceedTo={proceedTo}></Login>
  </>
}
