import Link from "next/link"

export default async function notFoundPage() {

  return <>
    <h2>Page not found</h2>
    There are no games here.

    <Link href='/'>Try the lobby</Link>
  </>
}
