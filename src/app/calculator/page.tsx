import ColorCalculator from "@/components/calculator"
import ColorSelect from "@/components/colorSelector"
import Link from "next/link"

const Calculator = () => {
  return (
    <main>
      <p>Calculator</p>
      <ColorCalculator />
      <Link href="/">
        <button>Return to home</button>
      </Link>
    </main>
  )
}

export default Calculator