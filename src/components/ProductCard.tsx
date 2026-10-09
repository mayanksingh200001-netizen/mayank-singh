import React, { useState } from 'react';
import { Heart, Plus, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => setQuickViewProduct(product)}
      className="group cursor-pointer flex flex-col justify-between bg-white rounded-xl border border-neutral-200/80 overflow-hidden hover:border-neutral-400/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top Image Showcase (65%–75% height) */}
      <div className="relative aspect-[4/3] bg-neutral-100/90 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
            style={{ backgroundColor: product.fallbackColor }}
          >
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
              {product.categoryLabel}
            </span>
            <span className="text-sm font-semibold text-neutral-200 mt-1">
              {product.name}
            </span>
          </div>
        )}

        {/* Quiet Subtle Badge (Max 1 subtle text tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-xs text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
            isFavorite
              ? 'bg-neutral-900 text-white'
              : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-neutral-950'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-2.5 py-1.5 text-[11px] font-medium text-neutral-900 bg-white/95 rounded-md shadow-xs flex items-center gap-1.5 hover:bg-white"
          >
            <Eye className="w-3 h-3 text-neutral-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-medium text-neutral-600">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 font-mono tabular-nums text-[11px]">
              <span>★ {product.rating.toFixed(1)}</span>
              <span className="text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
            {product.subtitle}
          </p>
        </div>

        {/* Footer Area: Variants & Price & Quick Add */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          {/* Finish Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                title={v.name}
                aria-label={`Select ${v.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedVariant.id === v.id
                    ? 'ring-2 ring-neutral-900 ring-offset-1 border-transparent scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>

          {/* Price & Action */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-neutral-900 font-mono tabular-nums">
                ${product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="text-[11px] text-neutral-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to bag`}
              className={`p-2 rounded-lg transition-all ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'
              }`}
            >
              {justAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
