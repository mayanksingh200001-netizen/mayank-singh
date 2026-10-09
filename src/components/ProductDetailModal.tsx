import React, { useState } from 'react';
import { X, Check, Heart, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductVariant } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isWishlisted,
    toggleWishlist,
  } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0];
  const isFavorite = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentVariant);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-neutral-600 hover:text-neutral-900 shadow-xs hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="md:col-span-6 bg-neutral-100 relative flex flex-col justify-between p-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 shadow-inner">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Guarantees Strip */}
            <div className="mt-6 pt-5 border-t border-neutral-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span className="font-medium">Free Freight</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-neutral-800" />
                <span className="font-medium">Certified Build</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-neutral-800" />
                <span className="font-medium">30-Day Trial</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-neutral-700">
                  {quickViewProduct.categoryLabel}
                </span>
                <div className="flex items-center gap-1 font-mono tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-neutral-800">
                    {quickViewProduct.rating.toFixed(1)}
                  </span>
                  <span>({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                {quickViewProduct.subtitle}
              </p>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                  ${quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                    ${quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium ml-auto">
                  In Stock ({quickViewProduct.stockCount} units remaining)
                </span>
              </div>

              {/* Tabs: Overview / Specs / Reviews */}
              <div className="mt-6 border-b border-neutral-200 flex gap-6 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-neutral-900 text-neutral-900 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-neutral-900 text-neutral-900 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-neutral-900 text-neutral-900 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Reviews ({quickViewProduct.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs text-neutral-600 leading-relaxed min-h-[90px]">
                {activeTab === 'overview' && (
                  <p>{quickViewProduct.description}</p>
                )}

                {activeTab === 'specs' && (
                  <dl className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <dt className="text-neutral-400">Materials</dt>
                      <dd className="font-medium text-neutral-800">{quickViewProduct.specs.materials}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400">Dimensions</dt>
                      <dd className="font-medium text-neutral-800 font-mono tabular-nums">{quickViewProduct.specs.dimensions}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400">Provenance</dt>
                      <dd className="font-medium text-neutral-800">{quickViewProduct.specs.origin}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400">Warranty</dt>
                      <dd className="font-medium text-neutral-800">{quickViewProduct.specs.warranty}</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {quickViewProduct.reviews.map((r) => (
                      <div key={r.id} className="border-b border-neutral-100 pb-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-neutral-900">{r.author}</span>
                          <span className="text-neutral-400">{r.date}</span>
                        </div>
                        <p className="mt-1 text-neutral-600">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Variant Selector */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-800">
                    Finish: <span className="font-semibold text-neutral-950">{currentVariant.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        currentVariant.id === v.id
                          ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-xs'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: v.colorHex }}
                      />
                      <span>{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase CTA Strip */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-200 rounded-lg p-1 bg-neutral-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-white rounded transition-colors text-sm font-semibold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-mono tabular-nums text-xs font-semibold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-white rounded transition-colors text-sm font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-[0.99]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        ${(quickViewProduct.price * quantity).toLocaleString()}
                      </span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFavorite
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
