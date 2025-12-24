"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Commands", href: "/commands" },
  { label: "Developer", href: "/dev" },
  { label: "Partner", href: "/partner" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://img5.pic.in.th/file/secure-sv1/111a153edc20de838c.png"
            alt="Jasmine Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-[#e5e5e5]">Jasmine</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#e5e5e5] text-[#0f0f0f] text-sm font-medium rounded-lg hover:bg-[#d4d4d4] transition-colors"
          >
            Invite Bot
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#9ca3af] hover:text-[#e5e5e5]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f0f] border-b border-[#262626]"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#e5e5e5] text-[#0f0f0f] text-sm font-medium rounded-lg hover:bg-[#d4d4d4] transition-colors text-center"
              >
                Invite Bot
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
