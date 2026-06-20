import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group glass rounded-2xl overflow-hidden p-4 cursor-pointer transition-all duration-300 hover:scale-[1.03]">

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={`${BASEURL}${product.image}`}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* GOLD OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* BADGE */}
          <div className="absolute top-3 left-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-2 py-1 rounded-full">
            Premium
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-4 space-y-2">

          <h2 className="text-lg font-semibold text-white truncate group-hover:text-yellow-400 transition">
            {product.name}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-2">
            High quality premium product with luxury finish and modern design.
          </p>

          <div className="flex items-center justify-between mt-3">

            <p className="text-yellow-400 font-bold text-lg">
              ₹ {product.price}
            </p>

            <button className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition">
              View
            </button>

          </div>

        </div>

      </div>
    </Link>
  );
}

export default ProductCard;