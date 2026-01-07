import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  // Use placeholder if not found during dev
  const placeholderPosts: Record<string, any> = {
    'perfect-espresso-secret': {
      title: 'The Secret to Our Perfect Espresso',
      content: 'Discover the journey of our beans from the high altitudes of Ethiopia to your cup. At Karthik\'s Cafe, we believe that coffee is more than just a drink; it\'s an experience.\n\nOur journey begins with the selection of the finest Arabica beans, sourced directly from small-batch farmers who share our commitment to quality and sustainability. These beans are then roasted to perfection in small batches, ensuring that every note and aroma is preserved.\n\nThe final step is the extraction. Our baristas are trained in the art of the perfect pull, balancing temperature, pressure, and time to create a rich, velvety espresso with a beautiful crema.\n\nCome and taste the difference for yourself.',
      author: 'Karthik Yemul',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
    }
  }

  const displayPost = post || placeholderPosts[slug]

  if (!displayPost) {
    notFound()
  }

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={displayPost.image_url}
            alt={displayPost.title}
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 pb-16 mx-auto text-white space-y-4">
          <Link href="/blog" className="flex items-center space-x-2 text-sm uppercase tracking-widest font-bold gold-text mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Journal</span>
          </Link>
          <div className="flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-bold">
             <span className="bg-gold-bg px-3 py-1 rounded">Culinary Art</span>
             <span>{new Date(displayPost.published_at).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold max-w-4xl leading-tight">
            {displayPost.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-24 container px-4 mx-auto">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b pb-8">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center text-white font-serif font-bold text-xl">
                  {displayPost.author[0]}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Written By</p>
                  <p className="font-serif font-bold text-lg">{displayPost.author}</p>
                </div>
             </div>
             <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
             </Button>
          </div>

          <div className="prose prose-lg prose-stone max-w-none">
            {displayPost.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="text-xl text-muted-foreground leading-relaxed mb-6 italic">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
             <h4 className="text-2xl font-serif italic font-bold gold-text">Share this story</h4>
             <div className="flex space-x-4">
                <Button variant="outline" className="rounded-full px-6">Twitter</Button>
                <Button variant="outline" className="rounded-full px-6">Facebook</Button>
                <Button variant="outline" className="rounded-full px-6">WhatsApp</Button>
             </div>
          </div>
        </div>
      </article>

      {/* Related Posts Teaser */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h3 className="text-3xl font-serif font-bold mb-12 text-center">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
             {/* Simple link back to blog */}
             <div className="bg-background p-12 rounded-2xl shadow-xl text-center space-y-6 flex flex-col items-center justify-center">
                <Calendar className="h-12 w-12 gold-text opacity-20" />
                <h4 className="text-2xl font-serif">Explore our full journal</h4>
                <p className="text-muted-foreground">Discover more stories about our passion for coffee and food.</p>
                <Button asChild className="gold-bg">
                  <Link href="/blog">View All Posts</Link>
                </Button>
             </div>
             <div className="bg-background p-12 rounded-2xl shadow-xl text-center space-y-6 flex flex-col items-center justify-center">
                <User className="h-12 w-12 gold-text opacity-20" />
                <h4 className="text-2xl font-serif">Join the conversation</h4>
                <p className="text-muted-foreground">Follow us on social media for daily updates and behind-the-scenes.</p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">Instagram</Button>
                  <Button variant="outline" size="sm">Facebook</Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
