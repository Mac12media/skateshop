import type { Category, Option } from "@/types"
import { MixIcon } from "@radix-ui/react-icons"

import { Icons } from "@/components/icons"

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
]

export const productCategories = [
  {
    title: "2024",
    image: "/images/skateboard-one.webp",
    icon: Icons.shopify,
    subcategories: [
      {
        "title": "January",
        "description": "Month of January 2024",
        "slug": "january2024"
      },
      {
        "title": "February",
        "description": "Month of February 2024",
        "slug": "february2024"
      },
      {
        "title": "March",
        "description": "Month of March 2024",
        "slug": "march2024"
      },
      {
        "title": "April",
        "description": "Month of April 2024",
        "slug": "april2024"
      },
      {
        "title": "May",
        "description": "Month of May 2024",
        "slug": "may2024"
      },
      {
        "title": "June",
        "description": "Month of June 2024",
        "slug": "june2024"
      },
      {
        "title": "July",
        "description": "Month of July 2024",
        "slug": "july2024"
      },
      {
        "title": "August",
        "description": "Month of August 2024",
        "slug": "august2024"
      },
     
    ]
  },
  {
    title: "2023",
    image: "/images/clothing-one.webp",
    icon: Icons.shopify,
    subcategories: [
      {
        "title": "January",
        "description": "Month of January 2023",
        "slug": "january2023"
      },
      {
        "title": "February",
        "description": "Month of February 2023",
        "slug": "february2023"
      },
      {
        "title": "March",
        "description": "Month of March 2023",
        "slug": "march2023"
      },
      {
        "title": "April",
        "description": "Month of April 2023",
        "slug": "april2023"
      },
      {
        "title": "May",
        "description": "Month of May 2023",
        "slug": "may2023"
      },
      {
        "title": "June",
        "description": "Month of June 2023",
        "slug": "june2023"
      },
      {
        "title": "July",
        "description": "Month of July 2023",
        "slug": "july2023"
      },
      {
        "title": "August",
        "description": "Month of August 2023",
        "slug": "august2023"
      },
      {
        "title": "September",
        "description": "Month of September 2023",
        "slug": "september2023"
      },
      {
        "title": "October",
        "description": "Month of October 2023",
        "slug": "october2023"
      },
      {
        "title": "November",
        "description": "Month of November 2023",
        "slug": "november2023"
      },
      {
        "title": "December",
        "description": "Month of December 2023",
        "slug": "december2023"
      }
    ]
  },
  {
    title: "2022",
    image: "/images/shoe-one.webp",
    icon: Icons.shopify,
    subcategories: [
      {
        "title": "January",
        "description": "Month of January 2022",
        "slug": "january2022"
      },
      {
        "title": "February",
        "description": "Month of February 2022",
        "slug": "february2022"
      },
      {
        "title": "March",
        "description": "Month of March 2022",
        "slug": "march2022"
      },
      {
        "title": "April",
        "description": "Month of April 2022",
        "slug": "april2022"
      },
      {
        "title": "May",
        "description": "Month of May 2022",
        "slug": "may2022"
      },
      {
        "title": "June",
        "description": "Month of June 2022",
        "slug": "june2022"
      },
      {
        "title": "July",
        "description": "Month of July 2022",
        "slug": "july2022"
      },
      {
        "title": "August",
        "description": "Month of August 2022",
        "slug": "august2022"
      },
      {
        "title": "September",
        "description": "Month of September 2022",
        "slug": "september2022"
      },
      {
        "title": "October",
        "description": "Month of October 2022",
        "slug": "october2022"
      },
      {
        "title": "November",
        "description": "Month of November 2022",
        "slug": "november2022"
      },
      {
        "title": "December",
        "description": "Month of December 2022",
        "slug": "december2022"
      }
    ]
  },
  {
    title: "2021",
    image: "/images/backpack-one.webp",
    icon: Icons.shopify,
    subcategories: [
      {
        "title": "January",
        "description": "Month of January 2021",
        "slug": "january2021"
      },
      {
        "title": "February",
        "description": "Month of February 2021",
        "slug": "february2021"
      },
      {
        "title": "March",
        "description": "Month of March 2021",
        "slug": "march2021"
      },
      {
        "title": "April",
        "description": "Month of April 2021",
        "slug": "april2021"
      },
      {
        "title": "May",
        "description": "Month of May 2021",
        "slug": "may2021"
      },
      {
        "title": "June",
        "description": "Month of June 2021",
        "slug": "june2021"
      },
      {
        "title": "July",
        "description": "Month of July 2021",
        "slug": "july2021"
      },
      {
        "title": "August",
        "description": "Month of August 2021",
        "slug": "august2021"
      },
      {
        "title": "September",
        "description": "Month of September 2021",
        "slug": "september2021"
      },
      {
        "title": "October",
        "description": "Month of October 2021",
        "slug": "october2021"
      },
      {
        "title": "November",
        "description": "Month of November 2021",
        "slug": "november2021"
      },
      {
        "title": "December",
        "description": "Month of December 2021",
        "slug": "december2021"
      }
    ]
  }  
] satisfies Category[]

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
]

export function getSubcategories(category?: string): Option[] {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}
