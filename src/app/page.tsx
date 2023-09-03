import Link from "next/link"

const Home = () => {
  return (
    <main className="p-4 text-center">
      <p className="text-3xl font-semibold">Ohm Value Calculator</p>
      <p className="text-sm mb-2">Calculates the Ohm value of a resistor based on the band colors</p>
      <a target="_blank" href="https://github.com/CesarEGomezG">
        <p>Cesar Eliezer Gomez Gutierrez</p>
      </a>
      <a target="_blank" href="https://enroutesystems.com">
        <p className="mb-2">Enroute Systems</p>
      </a>
      <Link href="/calculator">
        <button className="bg-gray-200 py-1 px-4 rounded-md">Go to calculator</button>
      </Link>
    </main>
  )
}

export default Home