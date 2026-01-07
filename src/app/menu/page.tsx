import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function MenuPage() {
  const supabase = await createClient()

  // Fetch categories and menu items
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*, categories(name)')
    .eq('is_available', true)

  const placeholderItems = [
    {
      name: 'Avocado Toast Royale',
      description: 'Sourdough, poached eggs, heirloom tomatoes, and microgreens.',
      price: 18.00,
      category_slug: 'breakfast',
      image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop'
    },
    {
      name: 'Wagyu Beef Burger',
      description: 'Grade A5 Wagyu, caramelized onions, truffle aioli on a brioche bun.',
      price: 32.00,
      category_slug: 'lunch',
      image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Lobster Thermidor',
      description: 'Fresh Maine lobster, brandy cream sauce, Gruyère crust.',
      price: 45.00,
      category_slug: 'dinner',
      image_url: 'https://images.unsplash.com/photo-1533630664439-8405d949cf7f?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Golden Espresso',
      description: 'Premium Arabica beans, served with a gold-leaf chocolate shard.',
      price: 9.00,
      category_slug: 'beverages',
      image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Macaron Selection',
      description: 'Box of 6 artisanal macarons with seasonal flavors.',
      price: 24.00,
      category_slug: 'desserts',
      image_url: 'https://images.unsplash.com/photo-1569864358642-9d1619702663?q=80&w=2069&auto=format&fit=crop'
    }
  ]

  const itemsToDisplay = menuItems && menuItems.length > 0 ? menuItems : placeholderItems
  const catsToDisplay = categories && categories.length > 0 ? categories : [
    { name: 'Breakfast', slug: 'breakfast' },
    { name: 'Lunch', slug: 'lunch' },
    { name: 'Dinner', slug: 'dinner' },
    { name: 'Beverages', slug: 'beverages' },
    { name: 'Desserts', slug: 'desserts' }
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Menu Header */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt="Menu Header"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Culinary <span className="gold-text">Gallery</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Each dish is a masterpiece, meticulously prepared to delight your senses.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <Tabs defaultValue={catsToDisplay[0].slug} className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-muted/50 p-1 rounded-full h-auto flex-wrap justify-center">
                {catsToDisplay.map((category) => (
                  <TabsTrigger
                    key={category.slug}
                    value={category.slug}
                    className="px-8 py-3 rounded-full data-[state=active]:gold-bg data-[state=active]:text-white transition-all text-sm md:text-base font-medium"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {catsToDisplay.map((category) => (
              <TabsContent key={category.slug} value={category.slug} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {itemsToDisplay
                    .filter((item: any) => 
                      item.category_slug === category.slug || 
                      (item.categories && item.categories.slug === category.slug)
                    )
                    .map((item: any, index: number) => (
                      <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                        <div className="relative h-72 overflow-hidden">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full font-serif font-bold shadow-xl">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <CardContent className="p-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-2xl font-serif font-bold group-hover:gold-text transition-colors">{item.name}</h4>
                          </div>
                          <p className="text-muted-foreground leading-relaxed italic">
                            {item.description}
                          </p>
                          <div className="h-1 w-12 gold-bg rounded-full opacity-50" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Wine & Spirits Teaser */}
      <section className="py-24 luxury-gradient text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <Image 
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop" 
            alt="Wine Cellar" 
            fill 
            className="object-cover"
           />
         </div>
         <div className="container relative z-10 px-4 mx-auto text-center space-y-8">
            <h2 className="text-sm uppercase tracking-[0.3em] gold-text font-bold">The Cellar</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Exquisite Wine Pairings</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
              &quot;Wine is the only artwork you can drink.&quot; - Discover our curated selection of vintage wines and artisanal spirits.
            </p>
         </div>
      </section>
    </div>
  )
}
