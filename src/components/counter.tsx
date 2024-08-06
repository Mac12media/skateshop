"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';// Assuming Icons is a custom component
import { Badge } from './ui/badge';
import { Icons } from './icons';

const getRandomInterval = () => Math.floor(Math.random() * (22000 - 1000 + 1)) + 1000;

const DynamicShopifyCount = () => {
  const [storeCount, setStoreCount] = useState(2329758);

  useEffect(() => {
    const updateStoreCount = () => {
      setStoreCount(prevCount => prevCount + 1);
      // Set a new timeout with a random interval
      setTimeout(updateStoreCount, getRandomInterval());
    };

    // Start the first update
    const timeoutId = setTimeout(updateStoreCount, getRandomInterval());

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Link href="/products" target="_blank" rel="noreferrer">
      <Badge aria-hidden="true" className="rounded-md px-3.5 py-1.5" variant="secondary">
        <Icons.shopify className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
        {storeCount.toLocaleString()} shopify stores
      </Badge>
      <span className="sr-only">GitHub</span>
    </Link>
  );
};

export default DynamicShopifyCount;
