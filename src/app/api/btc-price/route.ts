import { NextResponse } from "next/server"

export async function GET() {
  // This is a mock price. In a real app, you'd fetch this from a crypto API
  const mockBtcPrice = 30000 + Math.random() * 2000

  return NextResponse.json({ price: mockBtcPrice.toFixed(2) })
}

