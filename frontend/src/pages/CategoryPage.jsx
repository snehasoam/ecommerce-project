import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.category.slug === slug
        );

        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, BASEURL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold text-yellow-400 capitalize mb-3">
          {slug}
        </h1>

        <p className="text-gray-400 mb-10">
          Explore our premium {slug} collection.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="text-gray-400">
              No products found in this category.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default CategoryPage;