import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, desc, eq, not } from "drizzle-orm"
import './HtmlViewer.css'; // Import the CSS file


import { cn, formatPrice, toTitleCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/cards/product-card"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { NewCard } from "../../../../components/cards/new-card"
import { Badge } from "@/components/ui/badge"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      name: true,
      url: true,
      description: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(product.name),
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      url: true,
      description: true,
      price: true,
      images: true,
      category: true,
      storeId: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(stores.id, product.storeId),
  })

  const otherProducts = store
    ? await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          url: products.url,
          images: products.images,
          category: products.category,
          inventory: products.inventory,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, productId))
          )
        )
        .orderBy(desc(products.inventory))
    : []

    const ids = `https://www.merchantgenius.io/previews/preview_page/${product.url}.html`
    const url = `https://${product.url}`

  return (
    
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: "Stores",
            href: "/products",
          },
          {
            title: toTitleCase(product.category),
            href: `/products?category=${product.category}`,
          },
          
          {
            title: product.name,
            href: `/product/${product.id}`,
          },
        ]}
      />
      <div className="relative w-1/2"> 
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
        </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
      
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
        
          <div className="space-y-2 gap-4 flex ">
          <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
           

          </div>
         
          {store ? (
              <Link
                href={`/products?store_ids=${store.id}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {store.name}
              </Link>
            ) : null}
          <Separator className="my-1.5" />
          <Link
              href={url}
              target="_blank"
              rel="noreferrer"
              className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"

            >
              
              {product.url}
            </Link>
          <AddToCartForm productId={productId} />
          <Separator className="mt-5" />
         
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
      </div>
      <div id="wrap">
      <div className="hidelogo rounded-2xl">
        <span className="shopPv">Shop Preview</span>
      </div>
      <div className="amp-iframe-wrappee ">
        <iframe
          width="1024"
          height="768"
          sandbox="allow-scripts"
          frameBorder="0"
          id="frame"
          src={ids}
          className="i-amphtml-element i-amphtml-layout-responsive rounded-2xl i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout"
          style={{ width: '100%', overflow: "hidden", border: 'none',     pointerEvents: 'none'
          }}
          title="Shop Preview"
        >
          {/* Optional: Placeholder content if iframe fails to load */}
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    </div>

      {store && otherProducts.length > 0 ? (
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            More stores from {store.name}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {otherProducts.map((product) => (
                <NewCard
                  key={product.id}
                  product={product}
                  className="min-w-[260px]"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      
    </Shell>
  )
}
