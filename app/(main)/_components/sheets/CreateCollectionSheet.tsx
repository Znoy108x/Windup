"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useForm } from 'react-hook-form'
import { createCollectionSchema, createCollectionSchemaType } from '../form-schemas/createCollection'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FromSubmitButton from '../buttons/FromSubmitButton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CollectionColorType, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { createCollection } from '@/lib/actions/collection'
import { toast } from 'react-hot-toast'
import { darkToastConfigsSuccess } from '@/lib/darkToastConfig'
import { useRouter } from 'next/navigation'

interface Props {
    open: boolean,
    toggleOpen: () => void
}

const CreateCollectionSheet = ({ open, toggleOpen }: Props) => {

    const router = useRouter()

    const form = useForm<createCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {
            name: "",
            color: ""
        }
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (formData: createCollectionSchemaType) => {
        try {
            toast.promise(
                createCollection(formData),
                {
                    loading: <span>Creating Collection!</span>,
                    error: (err) => <span>{err}</span>,
                    success: () => {
                        form.reset()
                        toggleOpen()
                        router.refresh()
                        return <span>Collection Created Successfully!</span>
                    }
                },
                darkToastConfigsSuccess
            )
        } catch (err) {
            console.log("CREATE-COLLECTION", err)
            toast.error(
                String(err),
                darkToastConfigsSuccess
            )
        }
    }

    return (
        <Sheet open={open} onOpenChange={toggleOpen}>
            <SheetContent side={"left"}>
                <SheetHeader className='flex items-center justify-center'>
                    <SheetTitle>Add New Collection</SheetTitle>
                    <SheetDescription>
                        Collections are used to group up your tasks.
                    </SheetDescription>
                </SheetHeader>
                <div className="my-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="please give collection name!" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(color) => field.onChange(color)}>
                                                <SelectTrigger className={cn("w-full text-white", CollectionColors[field.value as CollectionColorType])} >
                                                    <SelectValue placeholder="Select Color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.keys(CollectionColors).map((color) => (
                                                            <SelectItem
                                                                key={color}
                                                                value={color}
                                                                className={cn("w-full h-9 mt-2 px-4 py-3 cursor-pointer border-2 border-transparent hover:border-white transition-all duration-300",
                                                                    CollectionColors[color as CollectionColorType])}>
                                                                {color}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FromSubmitButton buttonTitle='Create Collection' isSubmitting={isSubmitting} />
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet