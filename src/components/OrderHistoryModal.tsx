import React from 'react';
import { X, Package, Clock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderHistoryModal: React.FC = () => {
  const { orders, isOrderHistoryOpen, setIsOrderHistoryOpen } = useCart();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-800" />
            <h3 className="text-sm font-semibold text-neutral-900 font-display">
              Order History ({orders.length})
            </h3>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Package className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-sm font-medium text-neutral-800">No previous orders</p>
              <p className="text-xs text-neutral-500">Your completed purchases will appear here.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#FBFBFA] border border-neutral-200 rounded-xl p-5 space-y-3"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-neutral-200/80 text-xs">
                  <div>
                    <span className="font-mono font-bold text-neutral-900">{ord.id}</span>
                    <span className="text-neutral-400 ml-2">Placed on {ord.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                      {ord.status}
                    </span>
                    <span className="font-mono tabular-nums font-bold text-neutral-900">
                      ${ord.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-neutral-700">
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 rounded object-cover bg-neutral-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate">{item.product.name} × {item.quantity}</span>
                      </div>
                      <span className="font-mono tabular-nums text-neutral-900 text-xs shrink-0">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-[11px] text-neutral-500">
                  <span>Estimated: {ord.estimatedDelivery}</span>
                  <span className="text-neutral-700 font-medium">{ord.customer.city}, {ord.customer.postalCode}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
