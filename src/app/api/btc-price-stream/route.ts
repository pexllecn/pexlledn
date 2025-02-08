import { type NextRequest, NextResponse } from "next/server"

const COIN_ID = "bitcoin"
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
    console.error("Error fetching BTC price:", error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendPrice = async () => {
        const price = await fetchPrice()
        if (price !== null) {
          const data = JSON.stringify({ price: price.toFixed(2) })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        } else {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Failed to fetch price" })}\n\n`))
        }
      }

      const interval = setInterval(sendPrice, 10000) // Update every 10 seconds

      // Send initial price
      await sendPrice()

      // Handle client disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
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

export const dynamic = "force-dynamic"

