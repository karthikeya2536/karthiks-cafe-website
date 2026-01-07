import Image from 'next/image'
import { ReservationForm } from '@/components/ReservationForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Clock, MapPin, Phone, Calendar } from 'lucide-react'

export default function ReservationsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Reservations Header"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Book Your <span className="gold-text">Experience</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
            Secure your place at the table and prepare for an unforgettable culinary journey.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-2xl p-4 md:p-8">
                <CardHeader className="text-center md:text-left">
                  <CardTitle className="text-3xl font-serif">Reservation Details</CardTitle>
                  <CardDescription className="text-lg">Please fill out the form below to request a table.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReservationForm />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-none bg-muted/50 p-6 space-y-6">
                <h3 className="text-2xl font-serif font-bold gold-text">Important Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Timing</h4>
                      <p className="text-sm text-muted-foreground">Reservations are held for 15 minutes past the scheduled time.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Group Bookings</h4>
                      <p className="text-sm text-muted-foreground">For parties larger than 10, please contact us directly via phone.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Confirmations</h4>
                      <p className="text-sm text-muted-foreground">Our team will call you to confirm your reservation details.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="rounded-2xl overflow-hidden relative h-64 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1550966841-3ee3ad359051?q=80&w=2070&auto=format&fit=crop"
                  alt="Atmosphere"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                  <p className="text-white font-serif italic text-xl">
                    &quot;Exceptional dining in the heart of the city.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
