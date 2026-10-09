import React from 'react';
import { Compass, Hammer, Trees } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Material Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-2 font-display">
            Built to Outlast Fleeting Interiors
          </h2>
          <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
            Every object in our Stockholm collection begins with a structural question: can this piece be repaired, refinished, and passed down across generations?
          </p>
        </div>

        {/* 3 Pillars Grid with generous whitespace & subtle hairline border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 rounded-xl border border-neutral-200/70 bg-[#FBFBFA]">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 font-display">
              FSC® Certified Nordic Timber
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We harvest white oak exclusively from managed Swedish and Danish forestry reserves. Slow winter growth creates high fiber density and warp resistance.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              Traceability Index · 100% Origin Audited
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-xl border border-neutral-200/70 bg-[#FBFBFA]">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 font-display">
              Steam-Bent Mortise & Tenon
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No hidden staples or composite core boards. We utilize traditional woodworker steam bending techniques and precision CNC-refined mortise joinery.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              Tolerance ±0.15mm · Master Guild Inspected
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-xl border border-neutral-200/70 bg-[#FBFBFA]">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 font-display">
              Acoustic Resonance Purity
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our hardware acoustic chambers are cast in solid aluminum blocks, eliminating harmonic cabinet distortions common in injection-molded plastics.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              THD &lt; 0.04% · Anechoic Chamber Tuned
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
