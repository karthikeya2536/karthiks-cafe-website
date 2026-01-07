import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  const placeholderPosts = [
    {
      title: 'The Secret to Our Perfect Espresso',
      slug: 'perfect-espresso-secret',
      content: 'Discover the journey of our beans from the high altitudes of Ethiopia to your cup...',
      author: 'Karthik Yemul',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'New Seasonal Autumn Menu',
      slug: 'autumn-menu-launch',
      content: 'As the leaves change, so does our menu. Introducing our new fall-inspired dishes...',
      author: 'Chef Marco',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2064&auto=format&fit=crop'
    }
  ]

  const postsToDisplay = posts && posts.length > 0 ? posts : placeholderPosts

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
            alt="Blog Header"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">The <span className="gold-text">Journal</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light italic">
            Stories of culinary passion, seasonal updates, and our cafe&apos;s journey.
          </p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {postsToDisplay.map((post: any, index: number) => (
              <Link key={index} href={`/blog/${post.slug}`} className="group">
                <Card className="border-none shadow-none bg-transparent overflow-hidden">
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Announcements
                    </div>
                  </div>
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>By {post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif font-bold group-hover:gold-text transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 italic">
                      {post.content}
                    </p>
                    <div className="flex items-center text-sm font-bold gold-text uppercase tracking-widest">
                      Read full story <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto text-center max-w-3xl space-y-8">
          <h2 className="text-4xl font-serif">Stay Informed</h2>
          <p className="text-lg text-muted-foreground">
            Join our mailing list to receive invitations to exclusive events, new seasonal menu previews, and culinary stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary outline-none"
            />
            <Button size="lg" className="gold-bg hover:opacity-90 px-8 rounded-xl h-auto py-4">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * We respect your privacy and will never share your information.
          </p>
        </div>
      </section>
    </div>
  )
}
