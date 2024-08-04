import Link from "next/link"
import { type CuratedStore } from "@/types"
import { type Product } from "@/db/schema"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Pick<
      Product,
      "id" | "name" | "price" | "images" | "category" | "inventory" | "description"
    >
    variant?: "default" | "switchable"
    isAddedToCart?: boolean
    onSwitch?: () => Promise<void>
  }


  export function NewCard({
    product,
    variant = "default",
    isAddedToCart = false,
    onSwitch,
    className,
    ...props
  }: ProductCardProps) {

    const href = `/product/${product.id}`
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
              product.images
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-red-600/10 bg-red-50 text-red-700"
            )}
          >
            {product.images ? "Active" : "Inactive"}
          </Badge>
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(product.id))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.description?.length
              ? product.description
              : ` ${product.name} `}
          </CardDescription>
        </CardHeader>
      </Card>
      <span className="sr-only">{product.name}</span>
    </Link>
  )
}
