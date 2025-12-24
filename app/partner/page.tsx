"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { motion } from "framer-motion"

const partnerId = "881901702767313017"

const partnerBots = [
  {
    name: "Invite MEAOW's",
    url: "https://discord.com/oauth2/authorize?client_id=1109184006412578828&permissions=8&integration_type=0&scope=bot+applications.commands",
  },
  {
    name: "Invite Paimon",
    url: "https://discord.com/oauth2/authorize?client_id=1244291562738024479&permissions=8&integration_type=0&scope=bot+applications.commands",
  },
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-[#e5e5e5] mb-4">Partner</h1>
            <p className="text-[#9ca3af] max-w-xl mx-auto">พาร์ทเนอร์ของ Jasmine Music Bot</p>
          </motion.div>

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProfileCard userId={partnerId} />

              {/* Partner Bot Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {partnerBots.map((bot) => (
                  <a
                    key={bot.name}
                    href={bot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#262626] text-[#e5e5e5] text-sm font-medium rounded-lg hover:bg-[#333333] transition-colors"
                  >
                    {bot.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
