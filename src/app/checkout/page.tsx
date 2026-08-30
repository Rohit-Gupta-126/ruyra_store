"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, QrCode, Timer, ShoppingBag, ShieldCheck, Check } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

type Step = "shipping" | "payment" | "processing" | "success";
type PaymentMethod = "phonepe" | "paytm" | "bhim";

interface ShippingDetails {
  email: string;
  fullName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
}

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();

  // Steps
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("phonepe");
  const [upiId, setUpiId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [paytmPhone, setPaytmPhone] = useState("");
  
  // Shipping Form State
  const [shipping, setShipping] = useState<ShippingDetails>({
    email: "",
    fullName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<ShippingDetails>>({});

  // Countdown timer for QR code (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Completed Order Details Cache
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: typeof cartItems;
    total: number;
    shipping: ShippingDetails;
  } | null>(null);

  // Shipping cost calculations (Free shipping over ₹1,999)
  const shippingCost = subtotal >= 1999 ? 0 : 150;
  const grandTotal = subtotal + shippingCost;

  // Handle countdown timer
  useEffect(() => {
    if (currentStep === "processing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentStep]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Validate Shipping form
  const validateForm = (): boolean => {
    const errors: Partial<ShippingDetails> = {};
    if (!shipping.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shipping.email)) errors.email = "Invalid email address";
    
    if (!shipping.fullName) errors.fullName = "Full name is required";
    if (!shipping.address) errors.address = "Address is required";
    if (!shipping.city) errors.city = "City is required";
    if (!shipping.state) errors.state = "State is required";
    
    if (!shipping.pinCode) errors.pinCode = "PIN Code is required";
    else if (!/^\d{6}$/.test(shipping.pinCode)) errors.pinCode = "PIN Code must be a 6-digit number";

    if (!shipping.phone) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(shipping.phone)) errors.phone = "Phone must be a 10-digit number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep("payment");
    }
  };

  // Process Mock Checkout Trigger
  const handlePaymentInitiate = () => {
    setTimeLeft(300);
    setCurrentStep("processing");
  };

  // Simulate payment confirmation
  const handlePaymentSuccess = () => {
    const generatedOrderId = `RY-INR-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrder({
      orderId: generatedOrderId,
      items: [...cartItems],
      total: grandTotal,
      shipping: { ...shipping },
    });
    setCurrentStep("success");
    clearCart(); // Clean cart state upon mock checkout completion
  };

  // If cart is empty and checkout hasn't completed, show empty state
  if (cartItems.length === 0 && currentStep !== "success") {
    return (
      <main className="min-h-screen bg-brand-sand flex items-center justify-center p-6 text-brand-brown">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-brand-brown/5">
          <div className="w-16 h-16 bg-brand-taupe/40 rounded-full flex items-center justify-center mx-auto text-brand-terracotta">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold">Your Keepsake Bag is Empty</h1>
          <p className="font-sans text-sm text-brand-text-muted leading-relaxed font-light">
            You cannot proceed to checkout without adding items to your shopping cart.
          </p>
          <Link
            href="/shop"
            className="inline-block w-full bg-brand-terracotta text-white py-3.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#B34E59] transition-all shadow-md"
          >
            Explore Handcrafted Blooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAF7F2] min-h-screen text-[#422926] pt-8 pb-24 font-sans selection:bg-brand-blush selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#EFE7DD] mb-8">
          <div className="flex items-center gap-3">
            {currentStep !== "success" && currentStep !== "shipping" && (
              <button
                onClick={() => setCurrentStep(currentStep === "payment" ? "shipping" : "payment")}
                className="p-2 hover:bg-brand-taupe rounded-full transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wide">CHISÓ Creations Checkout</h1>
              <p className="text-[10px] uppercase tracking-widest text-brand-text-muted">Handmade with love • Secure transaction</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-brand-text-muted text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-medium">100% Encrypted</span>
          </div>
        </div>

        {currentStep === "success" && completedOrder ? (
          /* ── SUCCESS SCREEN ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#EFE7DD] text-center space-y-8"
          >
            <div className="w-20 h-20 bg-brand-sage-light text-brand-sage rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-serif text-3xl font-bold md:text-4xl text-[#422926]">Order Confirmed ♡</h2>
              <p className="font-sans text-xs text-brand-text-muted uppercase tracking-widest font-semibold">
                Your order ID is <span className="text-brand-terracotta">{completedOrder.orderId}</span>
              </p>
              <p className="font-sans text-sm text-brand-text-muted max-w-md mx-auto font-light leading-relaxed">
                Thank you, {completedOrder.shipping.fullName}! Your handmade creations are being lovingly prepared and packed. A confirmation email has been dispatched to <span className="font-medium text-[#422926]">{completedOrder.shipping.email}</span>.
              </p>
            </div>

            <div className="border-t border-b border-[#EFE7DD] py-6 text-left space-y-4">
              <h3 className="font-serif text-base font-bold">Delivery Address</h3>
              <p className="font-sans text-xs text-brand-text-muted leading-relaxed font-light">
                {completedOrder.shipping.fullName}<br />
                {completedOrder.shipping.address}{completedOrder.shipping.apartment ? `, ${completedOrder.shipping.apartment}` : ""}<br />
                {completedOrder.shipping.city}, {completedOrder.shipping.state} - {completedOrder.shipping.pinCode}<br />
                Phone: {completedOrder.shipping.phone}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-sans text-sm text-brand-text-muted">
                <span>Payment Method</span>
                <span className="uppercase font-semibold text-brand-brown">
                  {selectedMethod} UPI
                </span>
              </div>
              <div className="flex justify-between font-sans text-base font-bold pt-2 border-t border-brand-brown/5">
                <span>Total Paid</span>
                <span>₹{completedOrder.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-block w-full bg-brand-brown text-brand-sand py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-brand-brown/95 transition-all shadow-md"
              >
                Return to Shop
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ── MAIN DUAL-COLUMN CHECKOUT ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Shipping & Payment Steps */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 md:p-10 border border-brand-brown/5 shadow-sm space-y-8"
                >
                  <h2 className="font-serif text-xl font-bold border-b border-brand-brown/5 pb-4">
                    1. Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="space-y-1 text-left">
                      <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                          formErrors.email ? "border-red-400" : "border-brand-brown/10"
                        }`}
                        placeholder="you@example.com"
                      />
                      {formErrors.email && <span className="text-red-500 text-[10px]">{formErrors.email}</span>}
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={shipping.fullName}
                        onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                        className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                          formErrors.fullName ? "border-red-400" : "border-brand-brown/10"
                        }`}
                        placeholder="Rohit Gupta"
                      />
                      {formErrors.fullName && <span className="text-red-500 text-[10px]">{formErrors.fullName}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left md:col-span-2">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={shipping.address}
                          onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                          className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                            formErrors.address ? "border-red-400" : "border-brand-brown/10"
                          }`}
                          placeholder="House No, Apartment name, Street details"
                        />
                        {formErrors.address && <span className="text-red-500 text-[10px]">{formErrors.address}</span>}
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          Apartment/Suite (Optional)
                        </label>
                        <input
                          type="text"
                          value={shipping.apartment}
                          onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                          className="w-full bg-brand-sand/50 border border-brand-brown/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                          placeholder="Suite 4B"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          City
                        </label>
                        <input
                          type="text"
                          value={shipping.city}
                          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                          className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                            formErrors.city ? "border-red-400" : "border-brand-brown/10"
                          }`}
                          placeholder="New Delhi"
                        />
                        {formErrors.city && <span className="text-red-500 text-[10px]">{formErrors.city}</span>}
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          State
                        </label>
                        <input
                          type="text"
                          value={shipping.state}
                          onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                          className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                            formErrors.state ? "border-red-400" : "border-brand-brown/10"
                          }`}
                          placeholder="Delhi"
                        />
                        {formErrors.state && <span className="text-red-500 text-[10px]">{formErrors.state}</span>}
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          value={shipping.pinCode}
                          onChange={(e) => setShipping({ ...shipping, pinCode: e.target.value })}
                          className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                            formErrors.pinCode ? "border-red-400" : "border-brand-brown/10"
                          }`}
                          placeholder="110001"
                          maxLength={6}
                        />
                        {formErrors.pinCode && <span className="text-red-500 text-[10px]">{formErrors.pinCode}</span>}
                      </div>

                      <div className="space-y-1 text-left md:col-span-2">
                        <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={shipping.phone}
                          onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                          className={`w-full bg-brand-sand/50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-terracotta transition-colors ${
                            formErrors.phone ? "border-red-400" : "border-brand-brown/10"
                          }`}
                          placeholder="9876543210"
                          maxLength={10}
                        />
                        {formErrors.phone && <span className="text-red-500 text-[10px]">{formErrors.phone}</span>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-brown hover:bg-brand-brown/95 text-brand-sand py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold shadow-md transition-all cursor-pointer"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Payment Selector Step */}
              {currentStep === "payment" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 md:p-10 border border-brand-brown/5 shadow-sm space-y-8"
                >
                  <div className="flex justify-between items-center border-b border-brand-brown/5 pb-4">
                    <h2 className="font-serif text-xl font-bold">2. Payment Method</h2>
                    <button
                      onClick={() => setCurrentStep("shipping")}
                      className="text-xs font-semibold text-brand-terracotta border-b border-brand-terracotta/20 pb-0.5"
                    >
                      Edit Shipping
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* PhonePe Radio Choice */}
                    <div
                      onClick={() => setSelectedMethod("phonepe")}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        selectedMethod === "phonepe"
                          ? "border-brand-brown bg-brand-sand/50"
                          : "border-brand-brown/10 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedMethod === "phonepe" ? "border-brand-brown" : "border-brand-brown/25"
                        }`}>
                          {selectedMethod === "phonepe" && (
                            <div className="w-3 h-3 rounded-full bg-brand-brown" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-sm font-semibold">PhonePe UPI / NetBanking</span>
                          <span className="text-[10px] text-brand-text-muted">Pay securely using UPI apps or QR</span>
                        </div>
                      </div>
                      <div className="bg-[#673ab7]/5 px-2.5 py-1.5 rounded-lg flex items-center shrink-0">
                        <span className="font-serif text-[#673ab7] font-bold italic tracking-wide text-xs">PhonePe</span>
                      </div>
                    </div>

                    {/* Paytm Radio Choice */}
                    <div
                      onClick={() => setSelectedMethod("paytm")}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        selectedMethod === "paytm"
                          ? "border-brand-brown bg-brand-sand/50"
                          : "border-brand-brown/10 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedMethod === "paytm" ? "border-brand-brown" : "border-brand-brown/25"
                        }`}>
                          {selectedMethod === "paytm" && (
                            <div className="w-3 h-3 rounded-full bg-brand-brown" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-sm font-semibold">Paytm Wallet & UPI Gateway</span>
                          <span className="text-[10px] text-brand-text-muted">Pay via Paytm balance or link bank account</span>
                        </div>
                      </div>
                      <div className="bg-[#00b9f5]/5 px-2.5 py-1.5 rounded-lg flex items-center shrink-0">
                        <span className="font-sans text-[#002970] font-black italic tracking-tight text-xs">paytm</span>
                      </div>
                    </div>

                    {/* BHIM UPI Radio Choice */}
                    <div
                      onClick={() => setSelectedMethod("bhim")}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        selectedMethod === "bhim"
                          ? "border-brand-brown bg-brand-sand/50"
                          : "border-brand-brown/10 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedMethod === "bhim" ? "border-brand-brown" : "border-brand-brown/25"
                        }`}>
                          {selectedMethod === "bhim" && (
                            <div className="w-3 h-3 rounded-full bg-brand-brown" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans text-sm font-semibold">BHIM Unified Payments Interface (UPI)</span>
                          <span className="text-[10px] text-brand-text-muted">Direct transfer from bank using virtual payment address</span>
                        </div>
                      </div>
                      <div className="bg-[#e47e24]/5 px-2.5 py-1.5 rounded-lg flex items-center shrink-0 border border-[#e47e24]/20">
                        <span className="font-sans text-[#1a5b8c] font-black tracking-tighter text-[10px]">BHIM <span className="text-[#e47e24]">UPI</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic details form input based on payment choice */}
                  <div className="bg-brand-sand/40 p-5 rounded-2xl border border-brand-brown/5 space-y-4">
                    {selectedMethod === "phonepe" && (
                      <div className="space-y-4 text-left">
                        <h4 className="font-serif text-sm font-bold">PhonePe Direct UPI</h4>
                        <div className="space-y-1.5">
                          <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                            Enter PhonePe UPI ID
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="username@ybl"
                              className="flex-1 bg-white border border-brand-brown/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta"
                            />
                            <button
                              onClick={handlePaymentInitiate}
                              disabled={!upiId.includes("@")}
                              className="bg-brand-brown text-brand-sand px-6 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              Verify & Pay
                            </button>
                          </div>
                          <span className="block text-[10px] text-brand-text-muted">
                            e.g. 9876543210@ybl or customusername@ybl
                          </span>
                        </div>
                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                          <span className="flex-shrink mx-3 text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold">Or Scan QR Code</span>
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                        </div>
                        <button
                          onClick={handlePaymentInitiate}
                          className="w-full border border-brand-brown/10 hover:border-brand-brown/20 bg-white text-brand-brown py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Generate PhonePe QR Code
                        </button>
                      </div>
                    )}

                    {selectedMethod === "paytm" && (
                      <div className="space-y-4 text-left">
                        <h4 className="font-serif text-sm font-bold">Paytm Secure Checkout</h4>
                        {!otpSent ? (
                          <div className="space-y-2">
                            <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                              Enter Mobile Linked to Paytm
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={paytmPhone}
                                onChange={(e) => setPaytmPhone(e.target.value)}
                                placeholder="9876543210"
                                maxLength={10}
                                className="flex-1 bg-white border border-brand-brown/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta"
                              />
                              <button
                                onClick={() => setOtpSent(true)}
                                disabled={paytmPhone.length !== 10}
                                className="bg-brand-brown text-brand-sand px-6 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                Send OTP
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                                Enter 6-digit OTP Code
                              </label>
                              <button
                                onClick={() => setOtpSent(false)}
                                className="text-[10px] text-brand-terracotta underline"
                              >
                                Edit Phone
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="flex-1 bg-white border border-brand-brown/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta text-center tracking-widest"
                              />
                              <button
                                onClick={handlePaymentInitiate}
                                disabled={otpCode.length !== 6}
                                className="bg-[#00b9f5] text-white px-6 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              >
                                Login & Pay
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                          <span className="flex-shrink mx-3 text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold">Or Scan QR Code</span>
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                        </div>
                        <button
                          onClick={handlePaymentInitiate}
                          className="w-full border border-brand-brown/10 hover:border-brand-brown/20 bg-white text-brand-brown py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Generate Paytm QR Code
                        </button>
                      </div>
                    )}

                    {selectedMethod === "bhim" && (
                      <div className="space-y-4 text-left">
                        <h4 className="font-serif text-sm font-bold">BHIM Unified Payments Interface</h4>
                        <div className="space-y-1.5">
                          <label className="font-sans text-xs uppercase tracking-wider font-semibold text-brand-brown/65">
                            Enter BHIM UPI VPA (Virtual Payment Address)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="username@upi"
                              className="flex-1 bg-white border border-brand-brown/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta"
                            />
                            <button
                              onClick={handlePaymentInitiate}
                              disabled={!upiId.includes("@")}
                              className="bg-brand-brown text-brand-sand px-6 py-2.5 rounded-xl font-sans text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                          <span className="flex-shrink mx-3 text-[10px] text-brand-text-muted uppercase tracking-widest font-semibold">Or Scan QR Code</span>
                          <div className="flex-grow border-t border-brand-brown/5"></div>
                        </div>
                        <button
                          onClick={handlePaymentInitiate}
                          className="w-full border border-brand-brown/10 hover:border-brand-brown/20 bg-white text-brand-brown py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Generate BHIM UPI QR Code
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Processing Verification Step */}
              {currentStep === "processing" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 md:p-10 border border-brand-brown/5 shadow-sm text-center space-y-8"
                >
                  <div className="space-y-3">
                    <h2 className="font-serif text-2xl font-bold">Secure Gateway Portal</h2>
                    <p className="font-sans text-xs uppercase tracking-widest text-brand-text-muted">Awaiting Transaction Completion</p>
                  </div>

                  <div className="max-w-xs mx-auto bg-brand-sand/50 p-6 rounded-2xl border border-brand-brown/5 space-y-6">
                    {/* Simulated QR Code for Desktop View / Option */}
                    <div className="bg-white p-4 rounded-xl shadow-inner border border-brand-brown/5 aspect-square flex items-center justify-center relative group">
                      <div className="w-full h-full relative opacity-90">
                        {/* Mock QR Code Pattern Layout */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-10 h-10 border-4 border-brand-brown rounded-sm" />
                            <div className="w-10 h-10 border-4 border-brand-brown rounded-sm" />
                          </div>
                          <div className="flex justify-between">
                            <div className="w-10 h-10 border-4 border-brand-brown rounded-sm" />
                            <div className="w-10 h-10 border-4 border-brand-brown/40 border-dashed rounded-sm" />
                          </div>
                        </div>
                        <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1.5 opacity-80">
                          {[...Array(25)].map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-[1px] ${
                                (i * 7 + 13) % 5 === 0 || i % 3 === 0
                                  ? "bg-brand-brown"
                                  : "bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-md border border-brand-brown/5">
                          {selectedMethod === "phonepe" && <span className="font-serif font-black text-[#673ab7] text-[8px]">PP</span>}
                          {selectedMethod === "paytm" && <span className="font-sans font-black text-[#002970] text-[8px]">Paytm</span>}
                          {selectedMethod === "bhim" && <span className="font-sans font-black text-[#1a5b8c] text-[8px]">BHIM</span>}
                        </div>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-2 text-brand-terracotta">
                      <Timer className="w-4 h-4" />
                      <span className="font-mono text-sm font-semibold tracking-wider">
                        {formatTime(timeLeft)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="font-sans text-xs font-semibold">
                        Scan the QR code using any UPI app
                      </p>
                      <p className="font-sans text-[10px] text-brand-text-muted leading-relaxed font-light">
                        Please do not refresh or close this browser screen. Verification completes automatically.
                      </p>
                    </div>
                  </div>

                  {/* Manual trigger for simulator success */}
                  <div className="pt-4 border-t border-brand-brown/5 space-y-4">
                    <p className="font-sans text-[10px] text-brand-text-muted italic">
                      [Developer Sandbox Control: Click below to simulate app authorization callback]
                    </p>
                    <button
                      onClick={handlePaymentSuccess}
                      className="bg-[#0F5132] text-white hover:bg-opacity-95 px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mx-auto cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Simulate Payment Callback Success
                    </button>
                    <button
                      onClick={() => setCurrentStep("payment")}
                      className="font-sans text-xs text-brand-text-muted hover:text-brand-brown transition-colors focus:outline-none"
                    >
                      Cancel Payment
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-brown/5 shadow-sm space-y-6 lg:sticky lg:top-28">
                <h3 className="font-serif text-lg font-bold border-b border-brand-brown/5 pb-4">
                  Order Summary
                </h3>

                {/* Items List */}
                <div className="divide-y divide-brand-brown/5 max-h-[30vh] overflow-y-auto no-scrollbar pr-1">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-sand shrink-0 border border-brand-brown/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div className="space-y-0.5">
                          <h4 className="font-sans text-xs font-semibold leading-tight line-clamp-2">
                            {item.name}
                          </h4>
                          <span className="block font-sans text-[10px] text-brand-text-muted">
                            Size/Scent: {item.variant}
                          </span>
                          <span className="block font-sans text-[10px] text-brand-text-muted">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <span className="font-sans text-xs font-bold text-brand-brown mt-1">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations details */}
                <div className="border-t border-brand-brown/5 pt-4 space-y-3">
                  <div className="flex justify-between font-sans text-xs text-brand-text-muted">
                    <span>Bag Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-sans text-xs text-brand-text-muted">
                    <span>Shipping Fee</span>
                    <span>{shippingCost === 0 ? "Complimentary" : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm font-bold pt-3 border-t border-brand-brown/5 text-brand-brown">
                    <span>Order Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="bg-brand-sand/30 rounded-2xl p-4 flex gap-3 text-left">
                  <Lock className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-sans text-xs font-semibold">Payment Sanctuary Assurance</p>
                    <p className="font-sans text-[10px] text-brand-text-muted leading-relaxed font-light">
                      Transactions processed securely using verified Indian gateways (PhonePe, Paytm, or BHIM API standards).
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
