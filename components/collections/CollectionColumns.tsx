"use client"

import { CollectionType } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import Delete from "@/components/custom_ui/Delete"
import Image from "next/image"
import Link from "next/link"

export const columnsCollection: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => <Link href={`/collections/${row.original._id}`} className="hover:text-blue-1">{row.original.title}</Link>
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({row}) => (
      <div className="relative w-[100px] h-[70px]">
        <Image src={row.original.image} fill objectFit="cover" alt={row.original.title} />
      </div>
    )
  },
  {
    accessorKey: "products",
    header: "Product",
    cell: ({row}) => <p>{row.original.products.length}</p>
  },
  {
    id: "actions",
    cell: ({row}) => <Delete id={row.original._id} />
  }
]