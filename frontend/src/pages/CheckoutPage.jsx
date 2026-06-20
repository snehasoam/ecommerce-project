import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const nav = useNavigate();
  const { clearCart, cartItems } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const totalAmount = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authFetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          total: totalAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        alert("Order placed successfully!");
        nav("/");
      } else {
        alert(data.error || "Order failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white px-6 md:px-16 py-20">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Checkout <span className="text-yellow-400">Details</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="glass p-6 md:p-10 rounded-2xl space-y-4"
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Shipping Information
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none focus:border-yellow-400"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none focus:border-yellow-400"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            required
            rows="4"
            className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none focus:border-yellow-400"
          />

          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-gold w-full py-3 rounded-xl font-semibold mt-4"
          >
            Place Order
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="glass p-6 md:p-10 rounded-2xl">

          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto">

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Cart is empty</p>
            ) : (
              cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-white/10 pb-2"
                >
                  <p className="text-gray-300">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="text-yellow-400">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>
              ))
            )}

          </div>

          {/* TOTAL */}
          <div className="mt-6 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-yellow-400">₹ {totalAmount}</span>
          </div>

          {/* INFO BOX */}
          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>✔ Secure Checkout</p>
            <p>✔ Fast Delivery</p>
            <p>✔ Easy Return Policy</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;