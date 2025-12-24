import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-[#262626] py-12">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="https://img5.pic.in.th/file/secure-sv1/111a153edc20de838c.png"
              alt="Jasmine Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm text-[#9ca3af]">© 2025 Jasmine Bot.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dev" className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors">
              Developer
            </Link>
            <Link href="/partner" className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors">
              Partner
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
