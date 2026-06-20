import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <div className="min-h-screen bg-[#07070a] text-white px-6 md:px-16 py-20">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        🛒 Your <span className="text-yellow-400">Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT - CART ITEMS */}
          <div className="md:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="glass p-4 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl hover:scale-[1.01] transition"
              >

                {/* IMAGE */}
                <img
                  src={`${BASEURL}${item.product_image}`}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* NAME + PRICE */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.product_name}
                  </h2>
                  <p className="text-yellow-400 font-bold">
                    ₹ {item.product_price}
                  </p>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-black border border-yellow-500 text-yellow-400 rounded"
                  >
                    -
                  </button>

                  <span className="text-white">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-black border border-yellow-500 text-yellow-400 rounded"
                  >
                    +
                  </button>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="glass p-6 rounded-2xl h-fit">

            <h2 className="text-xl font-semibold text-yellow-400 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-gray-300">

              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-yellow-400">
                  ₹ {total.toFixed(2)}
                </span>
              </div>

            </div>

            {/* BUTTON */}
            <Link
              to="/checkout"
              className="btn-gold w-full mt-6 text-center block py-3 rounded-xl font-semibold"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Secure payment • Fast delivery • Easy returns
            </p>

          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;