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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    const { data: catData } = await supabase.from('categories').select('*').order('display_order')
    const { data: itemData } = await supabase.from('menu_items').select('*, categories(name)').order('created_at', { ascending: false })
    
    if (catData) setCategories(catData)
    if (itemData) setItems(itemData)
    setIsLoading(false)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    
    const payload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category_id: formData.get('category_id') as string,
      image_url: formData.get('image_url') as string,
      is_popular: formData.get('is_popular') === 'on',
      is_available: formData.get('is_available') === 'on',
    }

    try {
      if (editingItem) {
        const { error } = await supabase.from('menu_items').update(payload).eq('id', editingItem.id)
        if (error) throw error
        toast.success('Item updated successfully')
      } else {
        const { error } = await supabase.from('menu_items').insert([payload])
        if (error) throw error
        toast.success('Item added successfully')
      }
      setIsDialogOpen(false)
      fetchData()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Item deleted')
      fetchData()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, or remove items from your menu.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingItem(null)
        }}>
          <DialogTrigger asChild>
            <Button className="gold-bg hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" name="name" defaultValue={editingItem?.name} required placeholder="e.g. Lobster Bisque" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" defaultValue={editingItem?.price} required placeholder="25.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select name="category_id" defaultValue={editingItem?.category_id || categories[0]?.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingItem?.description} placeholder="Describe the flavors and ingredients..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL (Unsplash)</Label>
                <Input id="image_url" name="image_url" defaultValue={editingItem?.image_url} placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_popular" name="is_popular" defaultChecked={editingItem?.is_popular} />
                  <Label htmlFor="is_popular">Popular Item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_available" name="is_available" defaultChecked={editingItem?.is_available ?? true} />
                  <Label htmlFor="is_available">Currently Available</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" className="gold-bg" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Save Item'}
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
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="h-6 w-6 m-auto" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full">
                      {item.categories?.name}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">${parseFloat(item.price).toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {item.is_popular && <span className="text-[10px] uppercase font-bold text-orange-600">Popular</span>}
                      <span className={`text-[10px] uppercase font-bold ${item.is_available ? 'text-green-600' : 'text-red-600'}`}>
                        {item.is_available ? 'Available' : 'Sold Out'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingItem(item)
                        setIsDialogOpen(true)
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No menu items found. Add your first dish to get started!
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
