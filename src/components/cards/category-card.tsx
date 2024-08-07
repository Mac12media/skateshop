import Link from "next/link"
import { db } from "@/db"
import { products } from "@/db/schema"
import type { Category } from "@/types"
import { eq, sql } from "drizzle-orm"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CategoryCardProps {
  category: Category
}

export async function CategoryCard({ category }: CategoryCardProps) {
  const productCount = await db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(products)
    .where(eq(products.category, category.title))
    .execute()
    .then((res) => res[0]?.count ?? 0)

  return (
    <Link
      aria-label={category.title}
      key={category.title}
      href={`/categories/${category.title}`}
    >
      <Card className="relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted">
        <div className="absolute inset-0 z-10 bg-card/75" />
        <CardHeader className="relative z-20">
        </CardHeader>
        <CardContent className="relative z-20">
          <CardTitle className="text-xl text-card-foreground capitalize ">
            {category.title}
          </CardTitle>
          <CardDescription>{productCount} stores</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
