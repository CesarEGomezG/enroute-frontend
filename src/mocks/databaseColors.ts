import { ringColor } from "@/utils/ringColors"

const databaseColors: ringColor[] = [
  {
      id: 0,
      name: "pink",
      hex: "#d8a0a6",
      multiplier: 0.001,
      tolerance: null
  },
  {
      id: 1,
      name: "silver",
      hex: "#c0c0c0",
      multiplier: 0.01,
      tolerance: 10
  },
  {
      id: 2,
      name: "gold",
      hex: "#ffd700",
      multiplier: 0.1,
      tolerance: 5
  },
  {
      id: 3,
      name: "black",
      figure: 0,
      hex: "#0e0e10",
      multiplier: 1,
      tolerance: null
  },
  {
      id: 4,
      name: "brown",
      figure: 1,
      hex: "#7e4b26",
      multiplier: 10,
      tolerance: 1
  },
  {
      id: 5,
      name: "red",
      figure: 2,
      hex: "#a72920",
      multiplier: 100,
      tolerance: 2
  },
  {
      id: 6,
      name: "orange",
      figure: 3,
      hex: "#f67828",
      multiplier: 1000,
      tolerance: 0.05
  },
  {
      id: 7,
      name: "yellow",
      figure: 4,
      hex: "#f6b600",
      multiplier: 10000,
      tolerance: 0.02
  },
  {
      id: 8,
      name: "green",
      figure: 5,
      hex: "#61993b",
      multiplier: 100000,
      tolerance: 0.5
  },
  {
      id: 9,
      name: "blue",
      figure: 6,
      hex: "#007cb0",
      multiplier: 1000000,
      tolerance: 0.25
  },
  {
      id: 10,
      name: "violet",
      figure: 7,
      hex: "#76689a",
      multiplier: 10000000,
      tolerance: 0.1
  },
  {
      id: 11,
      name: "gray",
      figure: 8,
      hex: "#7a888e",
      multiplier: 100000000,
      tolerance: 0.01
  },
  {
      id: 12,
      name: "white",
      figure: 9,
      hex: "#e3d9c6",
      multiplier: 1000000000,
      tolerance: null
  }
]

export default databaseColors