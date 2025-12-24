"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col relative">
      {/* Cross pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Header />

      <section className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <Image
                src="https://img5.pic.in.th/file/secure-sv1/111a153edc20de838c.png"
                alt="Jasmine Bot"
                width={100}
                height={100}
                className="rounded-full ring-4 ring-[#262626]"
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text mb-3 text-cyan-100">
              Jasmine
            </h1>

            <p className="text-[#a3a3a3] text-sm mb-1 text-sidebar-ring">{"หนูเป็นบอทเปิดเพลงหน้าใหม่"}</p>
            <p className="text-[#737373] text-xs mb-6 text-sidebar-ring">รองรับหลากหลายแพลตฟอร์ม ฝากตัวด้วยนะครับ </p>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1252648819129188404&permissions=8&integration_type=0&scope=bot+applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-[#e5e5e5] text-xs font-medium rounded-full border border-[#404040] hover:bg-[#1a1a1a] transition-all duration-200"
              >
                เชิญบอทเข้าเซิร์ฟเวอร์
              </a>
              <Link
                href="/commands"
                className="px-5 py-2 text-[#e5e5e5] text-xs font-medium rounded-full border border-[#404040] hover:bg-[#1a1a1a] transition-all duration-200"
              >
                ดูรายการคำสั่ง
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
