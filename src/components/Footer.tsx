import Link from 'next/link'
import { Facebook, Instagram, Twitter, Utensils, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Utensils className="h-6 w-6 gold-text" />
              <span className="text-xl font-serif font-bold tracking-tighter">
                KARTHIK&apos;S <span className="gold-text">CAFE</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Experience the finest luxury dining with a modern twist. Fresh ingredients, exquisite taste, and an elegant atmosphere.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:gold-text transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:gold-text transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:gold-text transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 gold-text">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:gold-text transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:gold-text transition-colors">Menu</Link></li>
              <li><Link href="/reservations" className="hover:gold-text transition-colors">Reservations</Link></li>
              <li><Link href="/#about" className="hover:gold-text transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:gold-text transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 gold-text">Contact Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 gold-text shrink-0" />
                <span>123 Luxury Lane, Culinary District, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 gold-text shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 gold-text shrink-0" />
                <span>hello@karthikscafe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 gold-text">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon - Thu:</span>
                <span>08:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat:</span>
                <span>08:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>09:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/20 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Karthik&apos;s Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
