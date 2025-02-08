import { NextResponse } from "next/server"

export async function GET() {
  // This is a mock price. In a real app, you'd fetch this from a crypto API
  const mockEthPrice = 2500 + Math.random() * 100

  return NextResponse.json({ price: mockEthPrice.toFixed(2) })
}

