import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  
  // Fetch popular dishes
  const { data: popularDishes } = await supabase
    .from('menu_items')
    .select('*, categories(name)')
    .eq('is_popular', true)
    .limit(3)

  const placeholderDishes = [
    {
      name: 'Truffle Mushroom Risotto',
      description: 'Arborio rice slow-cooked with wild mushrooms, shaved black truffle, and 24-month aged Parmesan.',
      price: 28.00,
      image_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
      categories: { name: 'Main Course' }
    },
    {
      name: 'Pan-Seared Sea Bass',
      description: 'Fresh Mediterranean sea bass with saffron velouté, asparagus spears, and confit cherry tomatoes.',
      price: 34.00,
      image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
      categories: { name: 'Main Course' }
    },
    {
      name: 'Signature Chocolate Fondant',
      description: 'Warm dark chocolate cake with a molten center, served with Madagascar vanilla bean gelato.',
      price: 14.00,
      image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2070&auto=format&fit=crop',
      categories: { name: 'Desserts' }
    }
  ]

  const dishesToDisplay = popularDishes && popularDishes.length > 0 ? popularDishes : placeholderDishes

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Cafe Interior"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
              A Symphony of <span className="gold-text">Flavor</span> & <span className="gold-text">Elegance</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200">
              Experience the art of luxury dining at Karthik&apos;s Cafe, where every dish tells a story.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gold-bg hover:opacity-90 px-8 h-14 text-lg w-full sm:w-auto">
              <Link href="/reservations">Book a Table</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 h-14 text-lg w-full sm:w-auto">
              <Link href="/menu">Explore Menu</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                alt="Our Chef"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm uppercase tracking-widest mb-1 gold-text font-semibold">Executive Chef</p>
                <h3 className="text-3xl font-serif">Karthik Yemul</h3>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm uppercase tracking-[0.3em] gold-text font-bold">Our Story</h2>
                <h3 className="text-4xl md:text-5xl font-serif leading-tight">Crafting Culinary Excellence Since 2010</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Karthik&apos;s Cafe was born from a passion for bringing together the finest ingredients and innovative cooking techniques. Our journey began with a simple vision: to create a space where luxury meets comfort.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every ingredient is meticulously sourced from local organic farms and premium global suppliers, ensuring that each plate served is a masterpiece of freshness and flavor.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 gold-text shrink-0" />
                  <div>
                    <h4 className="font-bold">Organic</h4>
                    <p className="text-sm text-muted-foreground">100% Fresh Ingredients</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 gold-text shrink-0" />
                  <div>
                    <h4 className="font-bold">Artisanal</h4>
                    <p className="text-sm text-muted-foreground">Hand-crafted recipes</p>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="p-0 gold-text text-lg flex items-center group">
                Learn more about us <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] gold-text font-bold">Chef&apos;s Recommendations</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Signature Dishes</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of our most beloved creations, crafted with precision and artistic flair.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishesToDisplay.map((dish: any, index: number) => (
              <Card key={index} className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64">
                  <Image
                    src={dish.image_url}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    ${dish.price.toFixed(2)}
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <p className="text-xs uppercase tracking-widest gold-text font-bold">{dish.categories.name}</p>
                  <h4 className="text-xl font-serif font-bold">{dish.name}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {dish.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button size="lg" className="gold-bg hover:opacity-90 px-8 h-14 text-lg">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-sm uppercase tracking-[0.3em] gold-text font-bold">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif">What Our Guests Say</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Food Critic',
                content: 'Karthik&apos;s Cafe is a hidden gem. The attention to detail in every dish is unparalleled. The Truffle Risotto is a must-try!',
                stars: 5
              },
              {
                name: 'Michael Chen',
                role: 'Regular Guest',
                content: 'The atmosphere is so elegant and welcoming. It&apos;s my favorite place for business lunches and family celebrations alike.',
                stars: 5
              },
              {
                name: 'Elena Rodriguez',
                role: 'Local Resident',
                content: 'Exceptional service and exquisite food. The staff makes you feel like royalty from the moment you step in.',
                stars: 5
              }
            ].map((review, index) => (
              <Card key={index} className="bg-muted/50 border-none p-8 space-y-6">
                <div className="flex space-x-1 text-yellow-500">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic text-lg text-muted-foreground">
                  &quot;{review.content}&quot;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold-bg/20 flex items-center justify-center font-serif font-bold gold-text">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold">{review.name}</h5>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center items-center space-x-8 grayscale opacity-50">
            <div className="text-2xl font-serif font-bold italic">Michelin Guide</div>
            <div className="text-2xl font-serif font-bold italic">Traveler&apos;s Choice</div>
            <div className="text-2xl font-serif font-bold italic">Elite Dining</div>
          </div>
        </div>
      </section>

      {/* Booking CTA Block */}
      <section className="py-24 luxury-gradient text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-4xl md:text-6xl font-serif">Reserve Your Table Today</h3>
            <p className="text-xl text-gray-300 font-light">
              Don&apos;t miss out on an extraordinary culinary experience. Book your table now for an unforgettable evening.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button size="lg" className="gold-bg hover:opacity-90 px-10 h-14 text-lg w-full sm:w-auto">
                <Link href="/reservations">Book Now</Link>
              </Button>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 gold-text" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="w-px h-6 bg-white/20 hidden sm:block" />
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 gold-text" />
                  <span>Open until 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Map Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-serif">Visit Us</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Location</h4>
                      <p className="text-muted-foreground">123 Luxury Lane, Culinary District<br />New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Opening Hours</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground">
                        <span>Monday - Thursday</span>
                        <span className="text-right">08:00 - 22:00</span>
                        <span>Friday - Saturday</span>
                        <span className="text-right">08:00 - 23:00</span>
                        <span>Sunday</span>
                        <span className="text-right">09:00 - 21:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 gold-text shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Contact</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567<br />hello@karthikscafe.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-serif">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-bold mb-2">Do you have vegetarian/vegan options?</h4>
                    <p className="text-sm text-muted-foreground">Yes, our menu includes a variety of plant-based dishes crafted with the same luxury approach as our signature mains.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-bold mb-2">Is there parking available?</h4>
                    <p className="text-sm text-muted-foreground">Valet parking is available for all our guests during lunch and dinner service.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[600px] rounded-2xl overflow-hidden shadow-inner bg-muted relative">
              {/* Using a placeholder image for map */}
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop"
                alt="Map Location"
                fill
                className="object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl text-center space-y-4 max-w-sm">
                  <MapPin className="h-12 w-12 gold-text mx-auto" />
                  <h4 className="text-xl font-serif font-bold">Find Us on the Map</h4>
                  <p className="text-sm text-muted-foreground">Click below to get directions via your preferred navigation app.</p>
                  <Button className="gold-bg w-full">Open in Google Maps</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
