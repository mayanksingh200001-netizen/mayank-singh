import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Category } from '../types';

interface HeaderProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const {
    totalCartItems,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    orders,
    setIsOrderHistoryOpen,
  } = useCart();

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Slim Dismissible Top Banner */}
      {showBanner && (
        <div className="bg-[#1C1C1E] text-neutral-300 text-xs py-2 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
            <span>Stockholm Studio Dispatch: Complimentary White-Glove Freight on Orders Over $300</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="text-amber-300">Code NORD10 for 10% Off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-neutral-400 hover:text-white transition-colors p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3-Zone Top Bar Contract */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          Atelier Nord
        </a>

        {/* Zone 2: 4–5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeCategory === 'all'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            All Objects
          </button>
          <button
            onClick={() => onSelectCategory('audio')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeCategory === 'audio'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Acoustics
          </button>
          <button
            onClick={() => onSelectCategory('seating')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeCategory === 'seating'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Seating
          </button>
          <button
            onClick={() => onSelectCategory('lighting')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeCategory === 'lighting'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Lighting
          </button>
          <button
            onClick={() => onSelectCategory('living')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeCategory === 'living'
                ? 'text-neutral-900 font-semibold border-b-2 border-neutral-900'
                : 'hover:text-neutral-900'
            }`}
          >
            Living & Ceramics
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center gap-1.5 bg-neutral-100 rounded-lg px-2.5 py-1.5 border border-neutral-300">
                <Search className="w-3.5 h-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search objects..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none text-xs text-neutral-900 focus:outline-none w-32 sm:w-44"
                />
                <button
                  onClick={() => {
                    onSearchChange('');
                    setShowSearchInput(false);
                  }}
                  className="text-neutral-400 hover:text-neutral-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100/70 transition-colors"
                aria-label="Search"
                title="Search objects"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100/70 transition-colors"
            aria-label="Wishlist"
            title="Saved items"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neutral-900" />
            )}
          </button>

          {/* Past Orders */}
          {orders.length > 0 && (
            <button
              onClick={() => setIsOrderHistoryOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100/70 transition-colors"
              title="Order History"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>
          )}

          {/* Primary Action: Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
              {totalCartItems}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};
