'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Journal', href: '/blog' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Utensils className={`h-8 w-8 transition-colors ${scrolled ? 'gold-text' : 'text-white group-hover:gold-text'}`} />
              <span className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
                KARTHIK&apos;S <span className="gold-text">CAFE</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:gold-text ${
                    scrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="gold-bg hover:opacity-90">
                <Link href="/reservations">Book a Table</Link>
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 focus:outline-none transition-colors ${
                  scrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium hover:gold-text transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full gold-bg hover:opacity-90">
                <Link href="/reservations" onClick={() => setIsOpen(false)}>
                  Book a Table
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
