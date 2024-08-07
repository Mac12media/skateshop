import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, desc, eq, not } from "drizzle-orm"
import './HtmlViewer.css'; // Import the CSS file


import { cn, formatDate, formatPrice, toTitleCase } from "@/lib/utils"
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
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

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
      createdAt: true,
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

<Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
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
         <h1 className=" w-full justify-end	 font-bold flex leading-tight">
         {formatDate(product.createdAt!)}
        </h1> 
         
        </div>
        <div className="relative "> 
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
        <h1 className="text-4xl font-bold flex leading-tight lg:text-5xl">
          {product.name}
         
        </h1>
        
        {product.images ? (
          <div className="flex items-center space-x-4 pt-4">
            
                <Link
                  key={product.id}
                  href={url}
                  target="_blank"
              rel="noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    width={130}
                    height={130}
                    className="rounded-2xl bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{product.url}</p>
                    <p className="text-[12px] text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </Link>
                
          </div>
        ) : null}
      
      </div>
      
<div className="flex gap-4">
     
            <Button type="submit"  className="flex items-center space-x-2 w-max	" size="sm">
            <Link
              href={url}
              target="_blank"
              rel="noreferrer"
              className=" text-base  hover:underline"

            >
              
             {product.url}
            </Link>
         
        </Button>
            
            </div>
            
         
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."} </AccordionContent>
            </AccordionItem>
          </Accordion>
              

          {product.name} is an e-commerce website that was registered on {formatDate(product.createdAt!)}. The store is hosted on the Shopify platform. The publicly registered domain name for this store is {product.url}.

The store collects payments in the {} currency, and uses the {} language setting for its website.

It does not appear that the store owner has provided a contact email address. We recommend visiting the website directly for further details. You can also check out our FAQ for additional information.

Note: This website, ShopHunt, is not affiliated with {product.name}. Please contact the store owner directly for any issues or questions pertaining to the online store.
              
     

      {store && otherProducts.length > 0 ? (
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            More stores from <Link
                href={`/products?store_ids=${store.id}`}
                className="hover:underline"
              >
                {store.name}
               
              </Link>
          </h2>
          <div  style={{
                   overflowWrap: 'anywhere'
                  }}           className="overflow-x-auto  pb-2 pt-6">
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
