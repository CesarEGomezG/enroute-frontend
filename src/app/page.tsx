import Link from "next/link"

const Home = () => {
  return (
    <main>
      <p>Welcome to Cesar Project</p>
      <p>Calculates the Ohm value of a resistor based on the band colors</p>
      <Link href="/calculator">
        <button>Go to calculator</button>
      </Link>
    </main>
  )
}

export default Home