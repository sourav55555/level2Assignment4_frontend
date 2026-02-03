import { deleteMealId } from '@/actions/meal.acton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'

export default function DeleteAlertItem({ id }: { id: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true)
        
        const data = await deleteMealId(id);

        if (data.data.success) {
            toast.success("Item Deleted Successfully")
            router.push("/provider/menu")
            setOpen(false)
            setLoading(false)

        } else {
            toast.error("Delete request failed")
        }
    }
  return (
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className='bg-red-700 w-1/2 h-12 text-white hover:bg-red-900
           transition-all flex items-center justify-center gap-2 rounded-lg duration-300 text-sm'>
    
            <MdDeleteOutline size={18} /> Delete
                 
           </DialogTrigger>
            <DialogContent className='max-w-28 w-72 text-center bg-white'>
                <DialogHeader>
                  <DialogTitle className='text-center'>
                      Are you sure to delete the item?
                  </DialogTitle>
                <DialogDescription className='mt-4 justify-center mx-auto'>
                      <Button
                          onClick={()=> handleDelete()}
                          className='text-white bg-amber-600 me-3'
                          disabled={loading}
                      >
                          {loading && <AiOutlineLoading3Quarters className='animate-spin' />}
                          Confirm
                      </Button>
                      <Button className='text-white'
                          onClick={() => setOpen(false)}>
                          Cancel
                      </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
    </Dialog>
  )
}
