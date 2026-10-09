import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onFeaturedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFeaturedClick }) => {
  return (
    <section className="relative border-b border-neutral-200/80 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial & Call to Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              {/* Clean unboxed kicker with typographic separator */}
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 tracking-wider uppercase">
                <span>Stockholm Studio</span>
                <span aria-hidden="true">·</span>
                <span>Autumn Edition 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-neutral-900 leading-[1.15] font-display text-balance">
                Design for Acoustic Harmony & Tactile Living
              </h1>

              {/* Body Prose */}
              <p className="text-base text-neutral-600 leading-relaxed max-w-lg">
                We craft monolithic objects for modern interiors—from precision acoustic monitors in cast aluminum to steam-bent oak lounge seating. Built with natural materials that gain patina over decades.
              </p>
            </div>

            {/* Actions & Curator Note */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onFeaturedClick}
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors"
                >
                  Featured Hardware
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center gap-3 text-xs text-neutral-500">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-serif text-neutral-800 font-semibold text-xs">
                  AN
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Nordic Craft Standards</p>
                  <p className="text-neutral-500">Each piece numbered and certified by master joiners</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Focal Point */}
          <div className="lg:col-span-7 flex">
            <div className="w-full relative rounded-2xl overflow-hidden bg-neutral-200 shadow-sm border border-neutral-200/70 group min-h-[360px] lg:min-h-[460px]">
              <img
                src={HERO_IMAGE}
                alt="Architectural studio interior showcasing Aurum acoustic monitor and walnut lounge chair"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1">
                    Gallery Installation
                  </p>
                  <p className="text-base font-semibold font-display">
                    Nordic Gallery Suite No. 4, Östermalm
                  </p>
                </div>
                <div className="hidden sm:block text-right text-xs text-neutral-300 font-mono tabular-nums">
                  59°20'N · 18°04'E
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Proof Strip Below Hero */}
        <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-700">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
                Freight & White-Glove Setup
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Complimentary room-of-choice placement on orders over $300.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
                Up to 10-Year Warranty
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Structural joints and audio engineering guaranteed against material flaws.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-900 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
                30-Day In-Home Trial
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Experience sound and ergonomics in your own natural light and acoustic environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
