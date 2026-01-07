'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  CalendarDays, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const navItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menu Items', href: '/admin/dashboard/menu', icon: UtensilsCrossed },
    { name: 'Reservations', href: '/admin/dashboard/reservations', icon: CalendarDays },
    { name: 'Inquiries', href: '/admin/dashboard/contact', icon: MessageSquare },
    { name: 'Journal', href: '/admin/dashboard/blog', icon: BookOpen },
    { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r transition-all duration-300 flex flex-col fixed inset-y-0 z-40`}
      >
        <div className="p-6 flex items-center justify-between border-b">
          <Link href="/admin/dashboard" className={`flex items-center space-x-2 ${!isSidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 gold-bg rounded flex items-center justify-center text-white shrink-0">K</div>
            {isSidebarOpen && <span className="font-serif font-bold text-lg tracking-tight">ADMIN PANEL</span>}
          </Link>
        </div>

        <ScrollArea className="flex-1 py-6">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  } ${!isSidebarOpen && 'justify-center'}`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                  {isActive && isSidebarOpen && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t mt-auto">
          <Button 
            variant="ghost" 
            className={`w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 ${!isSidebarOpen && 'justify-center'}`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-xs text-muted-foreground">Karthik&apos;s Cafe</p>
            </div>
            <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
