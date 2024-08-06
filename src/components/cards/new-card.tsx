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
      "id" | "name" | "price" | "images" | "url" | "category" | "inventory"  
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
        <AspectRatio ratio={15 / 5}>
       

          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          {product.images && product.images.length > 0 && product.images[0]?.url != "https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_1200x1200.gif" ? (
    product.images.map((image, index) => (
      <div
        className="aspect-video min-w-0 w-full flex-full"
        key={index}
        style={{ height: '-webkit-fill-available' }}
      >
        <img
          aria-label={`Slide ${index + 1} of ${product.images!.length}`}
          role="group"
          aria-roledescription="slide"
          src={image.url}
          alt={image.name}
          className="rounded-t-md border-b w-full bg-white"
          style={{ height: '-webkit-fill-available' }}
        />
      </div>
    ))
  ) : (
    <div
      className="h-full rounded-t-md border-b"
      style={getRandomPatternStyle(String(product.id))}
    />
  )}

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
          
         
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.url?.length
              ? product.url
              : ` ${product.url} `}
          </CardDescription>
        </CardHeader>
      </Card>
      <span className="sr-only">{product.name}</span>
    </Link>
  )
}
