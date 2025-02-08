import { NextResponse } from "next/server"

const COIN_ID = "ethereum"
const CURRENCY = "eur"

async function fetchPrice() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_ID}&vs_currencies=${CURRENCY}`,
      { next: { revalidate: 10 } },
    )
    if (!response.ok) throw new Error("Failed to fetch price")
    const data = await response.json()
    return data[COIN_ID][CURRENCY]
  } catch (error) {
    console.error("Error fetching ETH price:", error)
    return null
  }
}

export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const price = await fetchPrice()
        if (price !== null) {
          const data = JSON.stringify({ price: price.toFixed(2) })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        } else {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Failed to fetch price" })}\n\n`))
        }
        await new Promise((resolve) => setTimeout(resolve, 10000)) // Update every 10 seconds
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

