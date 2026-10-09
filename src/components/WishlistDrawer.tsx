import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-neutral-800 fill-neutral-900" />
            <h2 className="text-base font-semibold text-neutral-900 font-display">
              Saved Objects
            </h2>
            <span className="text-xs text-neutral-500 font-mono tabular-nums">
              ({savedProducts.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {savedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <Heart className="w-10 h-10 text-neutral-300 stroke-[1.5]" />
              <p className="text-sm font-semibold text-neutral-800">Your wishlist is empty</p>
              <p className="text-xs text-neutral-500">
                Tap the heart on any product to save it for your space.
              </p>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <div
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 cursor-pointer shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="text-xs font-semibold text-neutral-900 truncate cursor-pointer hover:underline"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-neutral-900 font-mono tabular-nums mt-0.5">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors"
                    title="Move to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-neutral-400 hover:text-neutral-800 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-neutral-200 bg-[#FBFBFA]">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
};
