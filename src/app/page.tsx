import Link from "next/link"

const Home = () => {
  return (
    <main className="p-4 text-center">
      <p className="text-3xl font-semibold text-enroute_yellow">Ohm Value Calculator</p>
      <p className="mt-2 mb-4">Calculates the Ohm value of a resistor based on the band colors</p>
      <a target="_blank" href="https://github.com/CesarEGomezG">
        <p className="underline hover:text-enroute_yellow hover:font-semibold">Made by Cesar Eliezer Gomez Gutierrez &gt;</p>
      </a>
      <a target="_blank" href="https://enroutesystems.com">
        <p className="underline hover:text-enroute_yellow hover:font-semibold mb-2">To Enroute Systems &gt;</p>
      </a>
      <p className="mt-4 mb-1">Repositories:</p>
      <a target="_blank" href="https://github.com/CesarEGomezG/enroute-frontend">
        <p className="underline hover:text-enroute_yellow hover:font-semibold">Front-End GitHub repository &gt;</p>
      </a>
      <a target="_blank" href="https://github.com/CesarEGomezG/enroute-backend">
        <p className="underline hover:text-enroute_yellow hover:font-semibold">Back-End GitHub repository &gt;</p>
      </a>
      <Link href="/calculator">
        <button className="bg-white px-6 py-2 rounded-xl drop-shadow-md font-semibold text-black mt-6">Go to calculator</button>
      </Link>
    </main>
  )
}

export default Home