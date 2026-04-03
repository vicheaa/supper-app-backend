import { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, ArrowRight, CreditCard, Heart, Star } from 'lucide-react';

declare global {
  interface Window {
    SuperAppBridge?: {
      postMessage: (msg: string) => void;
    };
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 1, name: 'Premium Coffee Beans', price: 18.99, category: 'Groceries', rating: 4.8, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 2, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 3, name: 'Organic Honey', price: 12.50, category: 'Groceries', rating: 4.9, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: 4, name: 'Smart Fitness Band', price: 45.00, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
];

function ShoppingScreen({ cart, setCart }: { cart: Product[], setCart: any }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">MiniMart</h1>
          </div>
          <button 
            onClick={() => navigate('/cart')}
            className="relative p-2 rounded-full hover:bg-slate-100 transition"
          >
            <ShoppingCart className="w-6 h-6 text-slate-700" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Super Sale</h2>
            <p className="text-orange-100 text-sm mb-4">Get up to 50% off on electronics today!</p>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-orange-50 transition">
              Shop Now
            </button>
          </div>
          <Package className="absolute -right-4 -bottom-4 w-32 h-32 text-white/20" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Trending Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 group hover:shadow-md transition">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-orange-500 font-semibold mb-1">{product.category}</p>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-slate-500">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => setCart([...cart, product])}
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function CartScreen({ cart, setCart }: { cart: Product[], setCart: any }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (window.SuperAppBridge) {
      window.SuperAppBridge.postMessage(JSON.stringify({
        action: 'checkout',
        payload: { amount: total, items: cart.length }
      }));
      // Just visually empty the cart for effect.
      setCart([]);
      alert("Checkout sent to Native Bridge!");
    } else {
      alert("Success! (Running in standard web browser, bridge not found.)");
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowRight className="w-6 h-6 text-slate-800 rotate-180" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Your Cart</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full p-4 flex-1">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Cart is empty</h2>
            <p className="text-slate-500 mb-6 relative">Looks like you haven't added anything yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold w-full max-w-xs hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{item.name}</h3>
                  <p className="text-slate-500 text-xs mb-2">{item.category}</p>
                  <p className="font-bold text-orange-500">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => setCart(cart.filter((_, i) => i !== index))}
                  className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                >
                  &times;
                </button>
              </div>
            ))}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mt-6 space-y-3">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-xl font-bold text-orange-500">${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
          <button 
            onClick={handleCheckout}
            className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 active:scale-[0.98]"
          >
            <CreditCard className="w-5 h-5" />
            Pay ${(total * 1.1).toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShoppingScreen cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartScreen cart={cart} setCart={setCart} />} />
      </Routes>
    </HashRouter>
  );
}
