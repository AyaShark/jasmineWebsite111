"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileCard } from "@/components/profile-card"
import { motion } from "framer-motion"

const developerIds = ["814353466564313098", "1187727583517536327"]

export default function DeveloperPage() {
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
            <h1 className="text-4xl font-bold text-[#e5e5e5] mb-4">Developer</h1>
            <p className="text-[#9ca3af] max-w-xl mx-auto">ผู้พัฒนา Jasmine Music Bot</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {developerIds.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProfileCard userId={id} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
