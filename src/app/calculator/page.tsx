import ColorCalculator from "@/components/calculator"
import Link from "next/link"

const Calculator = () => {
  return (
    <main className="p-4">
      <p className="text-3xl font-semibold text-center mb-6">Band Resistor Color Code Calculator</p>
      <ColorCalculator />
      <Link href="/">
        <button>Return to home</button>
      </Link>
    </main>
  )
}

export default Calculator