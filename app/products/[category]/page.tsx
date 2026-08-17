import { CATEGORIES } from '@/data/categories';
import { getProducts } from '@/lib/data';
import CategoryPageClient from './CategoryPageClient';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const isWorkshop = categorySlug === 'workshops';
  const products = getProducts({ categorySlug, isWorkshop, sort: 'newest' });

  return <CategoryPageClient categorySlug={categorySlug} initialProducts={products} />;
}
