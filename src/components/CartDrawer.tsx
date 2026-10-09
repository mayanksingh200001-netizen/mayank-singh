import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    freeShippingThreshold,
    discountCode,
    discountMessage,
    applyDiscountCode,
    removeDiscountCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyDiscountCode(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            <h2 className="text-base font-semibold text-neutral-900 font-display">
              Shopping Bag
            </h2>
            <span className="text-xs text-neutral-500 font-mono tabular-nums">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F8F8F7] px-6 py-3 border-b border-neutral-200/80 text-xs text-neutral-600">
          <div className="flex justify-between items-center mb-1.5 font-medium">
            <span>
              {amountToFreeShipping > 0 ? (
                <>
                  Add <strong className="text-neutral-900 font-mono tabular-nums">${amountToFreeShipping}</strong> for complimentary freight
                </>
              ) : (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Unlocked Complimentary White-Glove Freight
                </span>
              )}
            </span>
            <span className="font-mono tabular-nums text-neutral-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-neutral-900 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">Your bag is currently empty</p>
                <p className="text-xs text-neutral-500 mt-1">Explore our Scandinavian collection of living objects.</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Browse Objects
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}`}
                className="py-4 flex gap-4 items-start"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200/80 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedVariant.id)
                      }
                      className="text-neutral-400 hover:text-neutral-800 p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Finish: {item.selectedVariant.name}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedVariant.id,
                            item.quantity - 1
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-700 hover:bg-white rounded transition-colors"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-mono tabular-nums text-xs font-medium text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedVariant.id,
                            item.quantity + 1
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-700 hover:bg-white rounded transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-xs font-semibold text-neutral-900 font-mono tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-[#FBFBFA] space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{discountCode} (Active)</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Voucher code (try NORD10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-neutral-900 uppercase placeholder:normal-case"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}
              {discountMessage && !discountCode && (
                <p className="text-[11px] text-amber-700 mt-1">{discountMessage}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200/70 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-neutral-900">${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Studio Discount</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Freight</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  ) : (
                    `$${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span className="font-mono tabular-nums text-base">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
