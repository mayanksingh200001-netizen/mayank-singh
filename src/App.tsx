import React, { useState, useMemo, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Category } from './types';
import { SlidersHorizontal, ArrowUpDown, SearchX } from 'lucide-react';

const ECommerceStore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const catalogRef = useRef<HTMLElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeaturedFilter = () => {
    setActiveCategory('audio');
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesSubtitle && !matchesCategory) {
          return false;
        }
      }
      // In stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E1E1E]">
      {/* 3-Zone Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (cat !== 'all') {
            catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={scrollToCatalog}
        onFeaturedClick={handleFeaturedFilter}
      />

      {/* Catalog & Filter Section */}
      <main ref={catalogRef} id="catalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{filteredProducts.length} Objects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
              {activeCategory === 'all' && 'The Studio Catalog'}
              {activeCategory === 'audio' && 'Acoustic Monitors & Hardware'}
              {activeCategory === 'seating' && 'Lounge & Ergonomic Seating'}
              {activeCategory === 'lighting' && 'Precision Desk Luminaires'}
              {activeCategory === 'living' && 'Handcrafted Stoneware & Table Objects'}
            </h2>
          </div>

          {/* Controls: Segmented Category Buttons + Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Category Tabs (Valid buttons) */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg overflow-x-auto max-w-full">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'audio', label: 'Audio' },
                  { id: 'seating', label: 'Seating' },
                  { id: 'lighting', label: 'Lighting' },
                  { id: 'living', label: 'Living' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === tab.id
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer select-none bg-neutral-100/70 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200/60 transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer"
              />
              <span>In-stock only</span>
            </label>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="appearance-none bg-neutral-100/70 hover:bg-neutral-100 border border-neutral-200/60 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-neutral-800 focus:outline-neutral-900 cursor-pointer transition-colors"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-neutral-500 absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Active Indicator / Reset */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-neutral-100 rounded-lg px-4 py-2.5 text-xs text-neutral-700">
            <span>
              Searching for: <strong className="text-neutral-900 font-semibold">"{searchQuery}"</strong> ({filteredProducts.length} matches)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-neutral-500 hover:text-neutral-900 underline font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* 3-Column Product Grid (desktop), 2-col (tablet), 1-col (mobile) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-4 bg-white rounded-xl border border-neutral-200/80 space-y-3">
            <SearchX className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-semibold text-neutral-900 font-display">
              No matching objects found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn't find any items matching your current filters. Try resetting your search query or selecting a different category.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Material & Craftsmanship Transparency */}
      <CraftsmanshipSection />

      {/* Quiet Architectural Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderHistoryModal />
      <WishlistDrawer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <ECommerceStore />
    </CartProvider>
  );
}
