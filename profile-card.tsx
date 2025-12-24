"use client"

import { motion } from "framer-motion"
import { useLanyard, type LanyardData, type LanyardActivity } from "@/hooks/use-lanyard"
import { Monitor, Smartphone, Globe } from "lucide-react"
import { useEffect, useState } from "react"

interface ProfileCardProps {
  userId: string
  showPlatform?: boolean
}

function getStatusColor(status: LanyardData["discord_status"]) {
  switch (status) {
    case "online":
      return "bg-[#23a55a]"
    case "idle":
      return "bg-[#f0b232]"
    case "dnd":
      return "bg-[#f23f43]"
    default:
      return "bg-[#80848e]"
  }
}

function getStatusText(status: LanyardData["discord_status"]) {
  switch (status) {
    case "online":
      return "ออนไลน์"
    case "idle":
      return "ไม่อยู่"
    case "dnd":
      return "ห้ามรบกวน"
    default:
      return "ออฟไลน์"
  }
}

function getAvatarUrl(user: LanyardData["discord_user"]) {
  if (user.avatar) {
    const ext = user.avatar.startsWith("a_") ? "gif" : "png"
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`
  }
  return `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(user.discriminator) % 5}.png`
}

function getActivityAssetUrl(activity: LanyardActivity, assetType: "large_image" | "small_image") {
  const asset = activity.assets?.[assetType]
  if (!asset) return null

  if (asset.startsWith("mp:external/")) {
    const path = asset.replace("mp:external/", "")
    return `https://media.discordapp.net/external/${path}`
  }

  if (asset.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${asset.replace("spotify:", "")}`
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${asset}.png`
  }

  return null
}

function getActivityTypeText(type: number) {
  switch (type) {
    case 0:
      return "กำลังเล่น"
    case 1:
      return "กำลังสตรีม"
    case 2:
      return "กำลังฟัง"
    case 3:
      return "กำลังดู"
    case 4:
      return null // Custom status
    case 5:
      return "กำลังแข่งขัน"
    default:
      return "กำลังเล่น"
  }
}

function ElapsedTime({ startTime }: { startTime: number }) {
  const [elapsed, setElapsed] = useState("")

  useEffect(() => {
    const updateElapsed = () => {
      const now = Date.now()
      const diff = now - startTime
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (hours > 0) {
        setElapsed(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ผ่านไปแล้ว`,
        )
      } else {
        setElapsed(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ผ่านไปแล้ว`)
      }
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)
    return () => clearInterval(interval)
  }, [startTime])

  return <span>{elapsed}</span>
}

function SpotifyProgress({ start, end }: { start: number; end: number }) {
  const [progress, setProgress] = useState({ current: "0:00", total: "0:00", percent: 0 })

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - start
      const duration = end - start
      const percent = Math.min((elapsed / duration) * 100, 100)

      const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
      }

      setProgress({
        current: formatTime(elapsed),
        total: formatTime(duration),
        percent,
      })
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [start, end])

  return (
    <div className="mt-2">
      <div className="w-full h-1 bg-[#262626] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1db954] transition-all duration-1000 ease-linear"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#9ca3af] mt-1">
        <span>{progress.current}</span>
        <span>{progress.total}</span>
      </div>
    </div>
  )
}

export function ProfileCard({ userId, showPlatform = true }: ProfileCardProps) {
  const { data, loading, error } = useLanyard(userId)

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111111] rounded-xl border border-[#262626] overflow-hidden"
      >
        <div className="h-16 bg-[#1a1a1a]" />
        <div className="px-4 pb-4">
          <div className="relative -mt-10 mb-3">
            <div className="w-20 h-20 rounded-full bg-[#262626] animate-pulse border-4 border-[#111111]" />
          </div>
          <div className="w-32 h-5 bg-[#262626] rounded animate-pulse mb-2" />
          <div className="w-24 h-4 bg-[#262626] rounded animate-pulse" />
        </div>
      </motion.div>
    )
  }

  if (error || !data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-[#111111] rounded-xl border border-[#262626]"
      >
        <div className="text-center text-[#9ca3af]">ไม่สามารถโหลดโปรไฟล์ได้</div>
      </motion.div>
    )
  }

  const {
    discord_user,
    discord_status,
    activities,
    spotify,
    active_on_discord_desktop,
    active_on_discord_mobile,
    active_on_discord_web,
  } = data

  const customStatus = activities.find((a) => a.type === 4)
  const gameActivities = activities.filter((a) => a.type !== 2 && a.type !== 4)
  const displayName = discord_user.global_name || discord_user.username

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111] rounded-xl border border-[#262626] overflow-hidden w-full max-w-[340px]"
    >
      {/* Banner */}
      <div className="h-16 bg-gradient-to-r from-[#1a1a1a] to-[#262626]" />

      <div className="px-4 pb-4">
        {/* Avatar with Status */}
        <div className="relative -mt-10 mb-3">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full border-4 border-[#111111] overflow-hidden bg-[#262626]">
              <img
                src={getAvatarUrl(discord_user) || "/placeholder.svg"}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ${getStatusColor(discord_status)} border-4 border-[#111111]`}
            />
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          {/* Username */}
          <div className="mb-3 pb-3 border-b border-[#262626]">
            <h3 className="text-lg font-bold text-[#e5e5e5]">{displayName}</h3>
            <p className="text-sm text-[#9ca3af]">{discord_user.username}</p>
          </div>

          {/* Custom Status */}
          {customStatus && (
            <div className="mb-3 pb-3 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                {customStatus.emoji && (
                  <span className="text-base">
                    {customStatus.emoji.id ? (
                      <img
                        src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? "gif" : "png"}?size=20`}
                        alt={customStatus.emoji.name}
                        className="w-5 h-5 inline"
                      />
                    ) : (
                      customStatus.emoji.name
                    )}
                  </span>
                )}
                <span className="text-sm text-[#e5e5e5]">{customStatus.state}</span>
              </div>
            </div>
          )}

          {/* Platform & Status */}
          {showPlatform && (
            <div className="mb-3 pb-3 border-b border-[#262626]">
              <p className="text-xs text-[#9ca3af] uppercase font-semibold mb-2">สถานะ</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(discord_status)}`} />
                  <span className="text-sm text-[#e5e5e5]">{getStatusText(discord_status)}</span>
                </div>
                <div className="flex items-center gap-1 text-[#9ca3af]">
                  {active_on_discord_desktop && <Monitor className="w-4 h-4" title="เดสก์ท็อป" />}
                  {active_on_discord_mobile && <Smartphone className="w-4 h-4" title="มือถือ" />}
                  {active_on_discord_web && <Globe className="w-4 h-4" title="เว็บ" />}
                </div>
              </div>
            </div>
          )}

          {/* Spotify */}
          {spotify && (
            <div className="mb-3 pb-3 border-b border-[#262626]">
              <p className="text-xs text-[#9ca3af] uppercase font-semibold mb-2">กำลังฟัง Spotify</p>
              <div className="flex items-start gap-3">
                <img
                  src={spotify.album_art_url || "/placeholder.svg"}
                  alt={spotify.album}
                  className="w-14 h-14 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#e5e5e5] truncate">{spotify.song}</p>
                  <p className="text-xs text-[#9ca3af] truncate">โดย {spotify.artist}</p>
                  <p className="text-xs text-[#9ca3af] truncate">ใน {spotify.album}</p>
                </div>
              </div>
              <SpotifyProgress start={spotify.timestamps.start} end={spotify.timestamps.end} />
            </div>
          )}

          {/* Game/App Activities */}
          {gameActivities.map((activity, index) => {
            const largeImage = getActivityAssetUrl(activity, "large_image")
            const smallImage = getActivityAssetUrl(activity, "small_image")
            const activityTypeText = getActivityTypeText(activity.type)

            return (
              <div
                key={index}
                className={index < gameActivities.length - 1 ? "mb-3 pb-3 border-b border-[#262626]" : ""}
              >
                {activityTypeText && (
                  <p className="text-xs text-[#9ca3af] uppercase font-semibold mb-2">{activityTypeText}</p>
                )}
                <div className="flex items-start gap-3">
                  {largeImage ? (
                    <div className="relative">
                      <img src={largeImage || "/placeholder.svg"} alt={activity.name} className="w-14 h-14 rounded" />
                      {smallImage && (
                        <img
                          src={smallImage || "/placeholder.svg"}
                          alt=""
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0a0a0a]"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded bg-[#262626] flex items-center justify-center">
                      <span className="text-2xl">🎮</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#e5e5e5] truncate">{activity.name}</p>
                    {activity.details && <p className="text-xs text-[#9ca3af] truncate">{activity.details}</p>}
                    {activity.state && <p className="text-xs text-[#9ca3af] truncate">{activity.state}</p>}
                    {activity.timestamps?.start && (
                      <p className="text-xs text-[#9ca3af]">
                        <ElapsedTime startTime={activity.timestamps.start} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
