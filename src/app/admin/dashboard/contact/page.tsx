'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, Mail, User, Clock, MessageSquare } from 'lucide-react'

export default function AdminContactPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setInquiries(data)
    setIsLoading(false)
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)
    
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Inquiry deleted')
      fetchInquiries()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Customer Inquiries</h1>
        <p className="text-muted-foreground">Manage messages and questions from your customers.</p>
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
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{inq.name}</span>
                      <span className="text-xs text-muted-foreground">{inq.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{inq.subject || 'No Subject'}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">View Message</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-serif">Message from {inq.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Subject</p>
                              <p className="font-medium">{inq.subject || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Message</p>
                              <p className="bg-muted/30 p-4 rounded-lg italic">
                                &quot;{inq.message}&quot;
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                              <span>Sent on {new Date(inq.created_at).toLocaleString()}</span>
                              <Button variant="link" className="h-auto p-0 gold-text" onClick={() => window.location.href = `mailto:${inq.email}`}>
                                Reply via Email
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteInquiry(inq.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {inquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No inquiries found.
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
