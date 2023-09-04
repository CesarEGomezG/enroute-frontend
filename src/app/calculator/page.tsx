'use client'

import ColorCalculator from "@/components/calculator"
import { useRouter } from "next/navigation"

const Calculator = () => {
  const router = useRouter()

  return (
    <main className="p-4 flex flex-col">
      <p className="text-3xl text-center mb-6 drop-shadow-xl text-enroute_yellow font-semibold shadow-inner">Band Resistor Color Code Calculator</p>
      <ColorCalculator />
      <button onClick={() => router.push("/")} className="self-center bg-white px-6 py-2 rounded-xl drop-shadow-md font-semibold text-black w-fit">Return to home</button>
    </main>
  )
}

export default Calculator