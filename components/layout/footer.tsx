import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex justify-between">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="Shadospace" width={28} height={28} />
              <span className="text-xl font-semibold">Shadospace</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              A developer-first publishing platform focused on practical,
              trustworthy technical content about web development, SEO, and
              product quality.
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              &copy; 2026 Shadospace. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:pandit.inn@gmail.com"
                aria-label="Email"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <MdEmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Help & Support */}
          <div className="w-60">
            <h3 className="mb-4 font-semibold">Support & Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
