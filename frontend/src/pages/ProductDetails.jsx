import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-400">
        Loading premium product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No product found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }
    addToCart(product.id);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white px-6 md:px-16 py-20">

      {/* MAIN CARD */}
      <div className="grid md:grid-cols-2 gap-10 items-center glass p-6 md:p-10 rounded-2xl">

        {/* IMAGE SECTION */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-xl shadow-2xl"
          />

          {/* GOLD GLOW */}
          <div className="absolute -inset-2 bg-yellow-500/10 blur-3xl rounded-full"></div>

          {/* BADGE */}
          <div className="absolute top-4 left-4 glass px-3 py-1 text-yellow-400 text-sm">
            🔥 Premium Product
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="space-y-5">

          <h1 className="text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-yellow-400">
            ₹ {product.price}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">

            <button
              onClick={handleAddToCart}
              className="btn-gold px-6 py-3 rounded-xl font-semibold"
            >
              Add to Cart 🛒
            </button>

            <a
              href="/"
              className="px-6 py-3 rounded-xl border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 transition"
            >
              Back Home
            </a>

          </div>

          {/* INFO BOXES */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center text-sm">

            <div className="glass p-3">
              <p className="text-yellow-400 font-bold">Free</p>
              <p className="text-gray-400">Shipping</p>
            </div>

            <div className="glass p-3">
              <p className="text-yellow-400 font-bold">7 Days</p>
              <p className="text-gray-400">Return</p>
            </div>

            <div className="glass p-3">
              <p className="text-yellow-400 font-bold">24/7</p>
              <p className="text-gray-400">Support</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;