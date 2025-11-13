import Login from "@/components/Login"

export default async function loginPage() {
  const spars = new URLSearchParams()
  const proceedTo = (spars.get('game') !== null)?
      `/game/${spars.get('game')}`:
    (spars.get('pending') !== undefined)?
      `/pending/${spars.get('pending')}`:
      '/'

  return <>
    <h1>Login</h1>
    <Login proceedTo={proceedTo}></Login>
  </>
}
