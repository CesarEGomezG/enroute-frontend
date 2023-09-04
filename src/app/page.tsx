import Link from "next/link"

const Home = () => {
  return (
    <main className="p-4 text-center">
      <p className="text-3xl font-semibold">Ohm Value Calculator</p>
      <p className="mb-2">Calculates the Ohm value of a resistor based on the band colors</p>
      <a target="_blank" href="https://github.com/CesarEGomezG">
        <p>Made by Cesar Eliezer Gomez Gutierrez</p>
      </a>
      <a target="_blank" href="https://enroutesystems.com">
        <p className="mb-2">To Enroute Systems</p>
      </a>
      <a target="_blank" href="">
        <p>Front-End GitHub repository</p>
      </a>
      <a target="_blank" href="">
        <p>Back-End GitHub repository</p>
      </a>
      <Link href="/calculator">
        <button className="bg-gray-200 py-1 px-4 rounded-md">Go to calculator</button>
      </Link>
    </main>
  )
}

export default Home