import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsOrderHistoryOpen, setIsWishlistOpen } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#18181A] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white font-display block">
              Atelier Nord
            </span>
            <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
              Contemporary Scandinavian studio designing tactile furniture, acoustic hardware, and precision luminaires. Rooted in Stockholm craftsmanship.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Stockholm · Copenhagen · Tokyo
            </div>
          </div>

          {/* Catalog Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Acoustic Monitors
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Lounge Seating
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Precision Lighting
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Stoneware & Living
                </a>
              </li>
            </ul>
          </div>

          {/* Client Care & Orders */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Client Care
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Saved Objects
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Freight & Assembly</span>
              </li>
              <li>
                <span className="text-neutral-500">10-Year Warranty</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Studio Dispatch
            </h4>
            <p className="text-xs text-neutral-400">
              Receive limited release previews and material research papers quarterly.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-800 text-emerald-400 text-xs">
                <Check className="w-4 h-4" />
                <span>Subscription confirmed. Welcome to the studio.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-neutral-400 flex-1 placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-neutral-100 hover:bg-white text-neutral-950 rounded-lg transition-colors shrink-0"
                  aria-label="Subscribe to dispatch"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Atelier Nord AB. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>EU Timber Regulation (EUTR) Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
