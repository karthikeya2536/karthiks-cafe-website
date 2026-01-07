import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Header"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Get in <span className="gold-text">Touch</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            We value your feedback and inquiries. Reach out to us for any special requests or information.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-serif font-bold">Contact Information</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you have a question about our menu, want to book a private event, or just want to say hello, we&apos;re here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full gold-bg/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 gold-text" />
                    </div>
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full gold-bg/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 gold-text" />
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-muted-foreground">hello@karthikscafe.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full gold-bg/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 gold-text" />
                    </div>
                    <div>
                      <h4 className="font-bold">Address</h4>
                      <p className="text-muted-foreground">123 Luxury Lane<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-serif font-bold">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-full border border-gold-border flex items-center justify-center hover:gold-bg hover:text-white transition-all cursor-pointer">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-gold-border flex items-center justify-center hover:gold-bg hover:text-white transition-all cursor-pointer">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-gold-border flex items-center justify-center hover:gold-bg hover:text-white transition-all cursor-pointer">
                    <Twitter className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl p-8">
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-muted relative grayscale">
         <Image 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
          alt="Map" 
          fill 
          className="object-cover opacity-60"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border flex items-center space-x-4">
              <MapPin className="h-8 w-8 gold-text" />
              <div>
                <h4 className="font-bold">Karthik&apos;s Cafe</h4>
                <p className="text-sm text-muted-foreground">Get Directions on Google Maps</p>
              </div>
            </div>
         </div>
      </section>
    </div>
  )
}
