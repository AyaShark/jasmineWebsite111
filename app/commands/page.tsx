"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

interface Command {
  name: string
  prefix?: string
  description: string
}

interface CommandCategory {
  title: string
  commands: Command[]
}

const commandCategories: CommandCategory[] = [
  {
    title: "คำสั่งทั่วไป",
    commands: [
      { name: "/botinfo", description: "ข้อมูลบอท" },
      { name: "/help", description: "ต้องการความช่วยเหลือ?" },
    ],
  },
  {
    title: "คำสั่งสร้างห้องเพลง",
    commands: [{ name: "/setup", description: "สร้างห้องเพลง" }],
  },
  {
    title: "คำสั่งเล่นเพลง",
    commands: [
      { name: "/play", prefix: "J!.play", description: "เล่นเพลง" },
      { name: "/skip", prefix: "J!.skip", description: "เล่นเพลงถัดไป" },
      { name: "/stop", prefix: "J!.stop", description: "หยุดเล่นเพลง และออกห้องเสียง" },
      { name: "/volume", prefix: "J!.volume", description: "ปรับระดับเสียง" },
      { name: "/leave", prefix: "J!.leave", description: "หยุดเล่นเพลง และออกห้องเสียง" },
      { name: "/loop", prefix: "J!.loop", description: "วนลูปเพลง" },
    ],
  },
  {
    title: "คำสั่งช่วยเหลือ",
    commands: [{ name: "/report", description: "แจ้งเวลาบอทมี Error หรือ ไม่เข้าใจอะไร" }],
  },
]

function CommandCard({ command }: { command: Command }) {
  return (
    <div className="p-4 bg-[#151515] rounded-lg border border-[#262626]">
      <h3 className="text-base font-semibold text-[#e5e5e5] mb-1">{command.name}</h3>
      {command.prefix && <p className="text-xs text-[#737373] mb-2">prefix: {command.prefix}</p>}
      <p className="text-sm text-[#a3a3a3]">{command.description}</p>
    </div>
  )
}

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />

      <section className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-[#e5e5e5] mb-2">Commands</h1>
            <p className="text-[#737373]">คำสั่งทั้งหมด</p>
          </motion.div>

          <div className="space-y-10">
            {commandCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <h2 className="text-lg font-semibold text-[#e5e5e5] mb-4">{category.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.commands.map((command) => (
                    <CommandCard key={command.name} command={command} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
