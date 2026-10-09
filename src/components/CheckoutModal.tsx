import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    createOrder,
    lastPlacedOrder,
    setLastPlacedOrder,
    setIsOrderHistoryOpen,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Sophia Lind',
    email: 'sophia.lind@nordicdesign.se',
    phone: '+46 8 123 4567',
    address: 'Birger Jarlsgatan 42, Apt 3B',
    city: 'Stockholm',
    postalCode: '114 29',
    country: 'Sweden',
    paymentMethod: 'card' as 'card' | 'cod',
    cardNumber: '4242 •••• •••• 9821',
    cardExp: '11/28',
    cardCvc: '849',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        fullName: formData.fullName,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
      });
      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
    setLastPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-800" />
            <h3 className="text-sm font-semibold text-neutral-900 font-display">
              {confirmedOrder ? 'Order Confirmation' : 'Secure Checkout'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 font-display">
                Thank You for Your Order
              </h2>
              <p className="text-xs text-neutral-500">
                Order <strong className="font-mono text-neutral-800">{confirmedOrder.id}</strong> has been received and scheduled for crating.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#F9F9F8] rounded-xl p-5 border border-neutral-200/80 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 text-neutral-700">
                <span className="font-medium">Estimated Delivery</span>
                <span className="font-semibold text-neutral-900">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>Shipping Address</span>
                <span className="text-neutral-900 font-medium text-right">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.postalCode}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-600">
                <span>Payment Method</span>
                <span className="capitalize text-neutral-900 font-medium">
                  {confirmedOrder.customer.paymentMethod === 'card'
                    ? 'Credit / Debit Card'
                    : 'Cash on Delivery (White-Glove)'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-200 text-neutral-900 font-bold text-sm">
                <span>Amount Paid</span>
                <span className="font-mono tabular-nums">${confirmedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setIsOrderHistoryOpen(true);
                }}
                className="flex-1 py-3 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4" />
                <span>View Order History</span>
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Delivery Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                1. Delivery & Recipient
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-neutral-200 rounded-lg p-2.5 focus:outline-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-neutral-200 rounded-lg p-2.5 focus:outline-neutral-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-neutral-200 rounded-lg p-2.5 focus:outline-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-neutral-200 rounded-lg p-2.5 focus:outline-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-neutral-200 rounded-lg p-2.5 focus:outline-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                2. Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-[#FBFBFA] text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="font-medium">Card Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-[#FBFBFA] text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span className="font-medium">Cash on Delivery</span>
                </button>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="bg-[#F8F8F7] p-3 rounded-lg border border-neutral-200 grid grid-cols-3 gap-2 text-xs">
                  <div className="col-span-3">
                    <label className="block text-[11px] text-neutral-500 mb-0.5">Card Number</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardNumber}
                      className="w-full bg-white border border-neutral-200 rounded p-2 text-xs font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] text-neutral-500 mb-0.5">Expiry</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardExp}
                      className="w-full bg-white border border-neutral-200 rounded p-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-0.5">CVC</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.cardCvc}
                      className="w-full bg-white border border-neutral-200 rounded p-2 text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-neutral-500">Total payable</p>
                <p className="text-xl font-bold text-neutral-900 font-mono tabular-nums">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-[0.99]"
              >
                {isSubmitting ? 'Securing Order...' : 'Place Order Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
