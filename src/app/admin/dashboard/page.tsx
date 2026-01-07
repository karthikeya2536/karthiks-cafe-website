import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed, CalendarDays, MessageSquare, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch counts
  const { count: menuCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true })
  const { count: reservationCount } = await supabase.from('reservations').select('*', { count: 'exact', head: true })
  const { count: inquiryCount } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true })

  // Fetch recent reservations
  const { data: recentReservations } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { name: 'Menu Items', value: menuCount || 0, icon: UtensilsCrossed, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Reservations', value: reservationCount || 0, icon: CalendarDays, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Inquiries', value: inquiryCount || 0, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Daily Visitors', value: '1.2k', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back to your administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentReservations && recentReservations.length > 0 ? (
              <div className="space-y-4">
                {recentReservations.map((res: any) => (
                  <div key={res.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center text-white text-xs font-bold">
                        {res.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{res.name}</p>
                        <p className="text-xs text-muted-foreground">{res.reservation_date} at {res.reservation_time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                        res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                <CalendarDays className="h-12 w-12 opacity-20" />
                <p>No recent reservations found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col space-y-2" asChild>
               <Link href="/admin/dashboard/menu">
                <UtensilsCrossed className="h-6 w-6 gold-text" />
                <span>Add Dish</span>
               </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2" asChild>
               <Link href="/admin/dashboard/reservations">
                <CalendarDays className="h-6 w-6 gold-text" />
                <span>Bookings</span>
               </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2" asChild>
               <Link href="/admin/dashboard/settings">
                <Settings className="h-6 w-6 gold-text" />
                <span>Site Config</span>
               </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col space-y-2" asChild>
               <Link href="/admin/dashboard/contact">
                <MessageSquare className="h-6 w-6 gold-text" />
                <span>Inquiries</span>
               </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
