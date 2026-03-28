# AIBrainX - Premium Humidifier & Diffuser Shop

A modern, high-conversion e-commerce landing page built with HTML5, CSS3, and JavaScript. Featuring a secure **Razorpay Integration** via Supabase Edge Functions.

## 🚀 Features

- **Shopify-Style Product Page**: Clean, focused design with a dynamic quantity selector.
- **Secure Payments**: Razorpay checkout handled by server-side verification using Supabase Edge Functions.
- **Dynamic Pricing**: Instant price calculation on the frontend based on selected quantities.
- **WhatsApp Direct Ordering**: Integrated WhatsApp API for Cash on Delivery (COD) and customer support.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing.
- **Rich UI**: High-end dark mode aesthetics with smooth micro-animations.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript.
- **Backend**: Supabase (Database + Edge Functions).
- **Payment Gateway**: Razorpay.

## 📦 Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yadavsandeep2710-glitch/myshop.git
   ```

2. **Supabase Setup**:
   - Create a table `public.orders` in Supabase.
   - Deploy the `razorpay-handler` Edge Function.
   - Configure secrets: `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

3. **Frontend Configuration**:
   - Update `SUPABASE_FUNCTION_URL` and `RAZORPAY_KEY_ID` in `js/app.js`.

---
*Built with ❤️ for High-Conversion E-commerce.*
