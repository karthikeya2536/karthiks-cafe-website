'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2, Save, Globe, Clock, Palette } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setIsLoading(true)
    const { data } = await supabase.from('settings').select('*')
    if (data) {
      const settingsObj = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value
        return acc
      }, {})
      setSettings(settingsObj)
    }
    setIsLoading(false)
  }

  const handleSave = async (key: string, value: any) => {
    setIsSaving(true)
    try {
      const { error } = await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() })
      if (error) throw error
      toast.success(`${key.replace('_', ' ')} updated successfully`)
      fetchSettings()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin gold-text" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Customize your website content, SEO, and appearance.</p>
      </div>

      <Tabs defaultValue="opening_hours" className="w-full">
        <TabsList className="bg-white border p-1 h-auto mb-8">
          <TabsTrigger value="opening_hours" className="px-6 py-2.5 data-[state=active]:gold-bg data-[state=active]:text-white transition-all">
            <Clock className="h-4 w-4 mr-2" /> Opening Hours
          </TabsTrigger>
          <TabsTrigger value="seo" className="px-6 py-2.5 data-[state=active]:gold-bg data-[state=active]:text-white transition-all">
            <Globe className="h-4 w-4 mr-2" /> SEO Settings
          </TabsTrigger>
          <TabsTrigger value="design" className="px-6 py-2.5 data-[state=active]:gold-bg data-[state=active]:text-white transition-all">
            <Palette className="h-4 w-4 mr-2" /> Design & Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opening_hours">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Manage Business Hours</CardTitle>
              <CardDescription>Update your restaurant&apos;s weekly schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newHours = Object.fromEntries(formData.entries())
                handleSave('opening_hours', newHours)
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="space-y-2">
                      <Label htmlFor={day} className="capitalize">{day}</Label>
                      <Input id={day} name={day} defaultValue={settings.opening_hours?.[day]} placeholder="e.g. 08:00 - 22:00" />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="gold-bg hover:opacity-90" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Search Engine Optimization</CardTitle>
              <CardDescription>Improve your visibility on Google and other search engines.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newSeo = Object.fromEntries(formData.entries())
                handleSave('seo', newSeo)
              }} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Meta Title</Label>
                  <Input id="title" name="title" defaultValue={settings.seo?.title} placeholder="Karthik's Cafe | Luxury Dining" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea id="description" name="description" defaultValue={settings.seo?.description} rows={4} placeholder="Brief description for search results..." />
                </div>
                <Button type="submit" className="gold-bg hover:opacity-90" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Update SEO
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Website Appearance</CardTitle>
              <CardDescription>Customize your brand colors and typography.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newDesign = Object.fromEntries(formData.entries())
                handleSave('design', newDesign)
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary_color">Primary Color (Hex)</Label>
                    <div className="flex space-x-2">
                      <Input id="primary_color" name="primary_color" defaultValue={settings.design?.primary_color} placeholder="#000000" />
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: settings.design?.primary_color }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary_color">Secondary Color (Hex)</Label>
                    <div className="flex space-x-2">
                      <Input id="secondary_color" name="secondary_color" defaultValue={settings.design?.secondary_color} placeholder="#C5A059" />
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: settings.design?.secondary_color }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font_family">Font Family (Headings)</Label>
                    <Select name="font_family" defaultValue={settings.design?.font_family}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Playfair Display">Playfair Display (Luxury)</SelectItem>
                        <SelectItem value="Cormorant Garamond">Cormorant Garamond (Classic)</SelectItem>
                        <SelectItem value="Montserrat">Montserrat (Modern)</SelectItem>
                        <SelectItem value="Inter">Inter (Clean)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="gold-bg hover:opacity-90" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Design
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
