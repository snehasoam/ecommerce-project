import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBanner from "../assets/images/hero-banner.jpg";

import {
  Smartphone,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Sofa,
  Watch,
  Truck,
  ShieldCheck,
  Headphones,
  ShoppingBag,
} from "lucide-react";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASEURL}/api/products/`);
        const data = await res.json();

        setFeaturedProducts(data.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [BASEURL]);

  const categories = [
    { name: "Electronics", icon: Smartphone, slug: "electronics" },
    { name: "Fashion", icon: Shirt, slug: "fashion" },
    { name: "Home", icon: HomeIcon, slug: "home" },
    { name: "Beauty", icon: Sparkles, slug: "beauty" },
    { name: "Furniture", icon: Sofa, slug: "furniture" },
    { name: "Accessories", icon: Watch, slug: "accessories" },
  ];

  return (
    <div className="bg-[#07070a] text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <img
          src={heroBanner}
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">

          <span className="inline-block px-4 py-2 border border-yellow-500 text-yellow-400 rounded-full text-sm mb-6">
            Premium Luxury Collection
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Discover The Future Of
            <br />
            <span className="text-yellow-400">
              Online Shopping
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
            Explore premium electronics, fashion, furniture,
            beauty products and accessories.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <Link
              to="/products"
              className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="px-8 py-4 border border-yellow-500 text-yellow-400 rounded-xl font-bold hover:bg-yellow-500 hover:text-black"
            >
              Explore Collection
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-6">

        <Feature icon={Truck} title="Free Delivery" />
        <Feature icon={ShieldCheck} title="Secure Payment" />
        <Feature icon={Headphones} title="24/7 Support" />
        <Feature icon={ShoppingBag} title="Premium Quality" />

      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link key={cat.slug} to={`/category/${cat.slug}`}>
                <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6 text-center hover:-translate-y-2 hover:border-yellow-400 transition">

                  <Icon
                    size={35}
                    className="mx-auto text-yellow-400"
                  />

                  <p className="mt-4 font-semibold">
                    {cat.name}
                  </p>

                </div>
              </Link>
            );
          })}

        </div>

      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold text-yellow-400">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="border border-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition"
          >
            View All
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">

          {featuredProducts.map((product) => (

            <div
              key={product.id}
              className="bg-white/5 border border-yellow-500/20 rounded-2xl overflow-hidden hover:-translate-y-2 transition"
            >

              <img
                src={`${BASEURL}${product.image}`}
                alt={product.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-yellow-400 text-xl mt-2">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="inline-block mt-4 text-yellow-400"
                >
                  View Details →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* SALE BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-3xl p-12 text-center text-black">

          <h2 className="text-4xl font-bold">
            Summer Sale 50% OFF
          </h2>

          <p className="mt-4">
            Premium products at unbeatable prices.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-xl"
          >
            Shop Deals
          </Link>

        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h2 className="text-4xl font-bold text-yellow-400">
          Subscribe Newsletter
        </h2>

        <p className="text-gray-400 mt-4">
          Get latest offers and product updates.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/5 border border-yellow-500/20 rounded-xl px-4 py-3 outline-none"
          />

          <button className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold">
            Subscribe
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-yellow-500/20 py-10">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-2xl font-bold text-yellow-400">
              LuxeStore
            </h3>

            <p className="text-gray-400 mt-3">
              Premium luxury shopping experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <p className="text-gray-400">Home</p>
            <p className="text-gray-400">Products</p>
            <p className="text-gray-400">Cart</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <p className="text-gray-400">Electronics</p>
            <p className="text-gray-400">Fashion</p>
            <p className="text-gray-400">Furniture</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-gray-400">support@luxestore.com</p>
          </div>

        </div>

      </footer>

    </div>
  );
}

function Feature({ icon: Icon, title }) {
  return (
    <div className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6 text-center hover:-translate-y-2 transition">
      <Icon className="mx-auto text-yellow-400" size={30} />
      <h3 className="mt-3 font-semibold">{title}</h3>
    </div>
  );
}

export default Home;