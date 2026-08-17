import { getProductBySlug, getRelatedProducts, getCrossCategoryProducts, getProducts } from '@/lib/data';
import { CATEGORIES } from '@/data/categories';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  const allProducts = [
    ...getProducts({ isWorkshop: true }),
    ...getProducts({ isWorkshop: false }),
  ];
  return allProducts.map((p) => ({
    category: p.category?.slug || 'hardware',
    slug: p.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { category: string; slug: string } }) {
  const product = getProductBySlug(params.slug);
  const related = product ? getRelatedProducts(product) : [];
  const cross = product ? getCrossCategoryProducts(product) : [];

  return (
    <ProductDetailClient
      categorySlug={params.category}
      product={product}
      relatedProducts={related}
      crossProducts={cross}
    />
  );
}
