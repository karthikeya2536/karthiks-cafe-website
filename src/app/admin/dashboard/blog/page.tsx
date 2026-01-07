'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, BookOpen } from 'lucide-react'
import Image from 'next/image'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setPosts(data)
    setIsLoading(false)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    
    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const payload = {
      title,
      slug,
      content: formData.get('content') as string,
      image_url: formData.get('image_url') as string,
      author: formData.get('author') as string,
      published_at: new Date().toISOString(),
    }

    try {
      if (editingPost) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', editingPost.id)
        if (error) throw error
        toast.success('Post updated successfully')
      } else {
        const { error } = await supabase.from('blog_posts').insert([payload])
        if (error) throw error
        toast.success('Post published successfully')
      }
      setIsDialogOpen(false)
      fetchPosts()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Post deleted')
      fetchPosts()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Blog & Announcements</h1>
          <p className="text-muted-foreground">Manage your cafe&apos;s news, events, and updates.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingPost(null)
        }}>
          <DialogTrigger asChild>
            <Button className="gold-bg hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input id="title" name="title" defaultValue={editingPost?.title} required placeholder="e.g. New Seasonal Menu Launch" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" defaultValue={editingPost?.author || 'Karthik Yemul'} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Featured Image URL</Label>
                  <Input id="image_url" name="image_url" defaultValue={editingPost?.image_url} placeholder="https://images.unsplash.com/..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea id="content" name="content" defaultValue={editingPost?.content} rows={12} required placeholder="Write your post content here..." />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" className="gold-bg" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Publish Post'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin gold-text" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                        {post.image_url ? (
                          <Image src={post.image_url} alt={post.title} fill className="object-cover" />
                        ) : (
                          <BookOpen className="h-5 w-5 m-auto text-muted-foreground" />
                        )}
                      </div>
                      <div className="font-bold line-clamp-1">{post.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingPost(post)
                        setIsDialogOpen(true)
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No posts found. Start sharing your cafe&apos;s story!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
