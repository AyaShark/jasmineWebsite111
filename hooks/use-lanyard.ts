"use client"

import { useEffect, useState, useRef } from "react"

export interface LanyardActivity {
  type: number
  name: string
  state?: string
  details?: string
  application_id?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  buttons?: string[]
  emoji?: {
    name: string
    id?: string
    animated?: boolean
  }
}

export interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name?: string
    display_name?: string
    avatar_decoration_data?: {
      asset: string
      sku_id: string
    }
    public_flags?: number
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: LanyardActivity[]
  spotify?: {
    track_id: string
    song: string
    artist: string
    album: string
    album_art_url: string
    timestamps: {
      start: number
      end: number
    }
  }
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
  listening_to_spotify: boolean
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("wss://api.lanyard.rest/socket")
      wsRef.current = ws

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: userId,
            },
          }),
        )
      }

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data)

        if (message.op === 1) {
          const heartbeatInterval = message.d.heartbeat_interval
          heartbeatRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }))
            }
          }, heartbeatInterval)
        } else if (message.op === 0) {
          if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
            setData(message.d)
            setLoading(false)
          }
        }
      }

      ws.onerror = () => {
        setError(new Error("WebSocket error"))
        setLoading(false)
      }

      ws.onclose = () => {
        if (heartbeatRef.current) {
          clearInterval(heartbeatRef.current)
        }
        setTimeout(connect, 5000)
      }
    }

    connect()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
      }
    }
  }, [userId])

  return { data, loading, error }
}
