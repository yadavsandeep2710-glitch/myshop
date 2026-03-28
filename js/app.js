/* ========================================
   AIBrainX - High-Conversion Landing Page
   ======================================== */

// Global State
let currentQty = 1;
const BASE_PRICE = 399;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AIBrainX Conversion Engine Loaded');

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.style.maxHeight;
            // Close all
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            // Toggle current
            const answer = item.querySelector('.faq-answer');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Sticky CTA Logic
    const stickyBar = document.getElementById('stickyBar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            stickyBar.style.display = 'block';
        } else {
            stickyBar.style.display = 'none';
        }
    });

    // Initial price update
    updateHeroQty(0);
});

// === Quantity Management ===
function updateHeroQty(delta) {
    const qtyDisplay = document.getElementById('heroQtyDisplay');
    const heroBtn = document.getElementById('heroBuyBtn');
    
    currentQty += delta;
    if (currentQty < 1) currentQty = 1;
    if (currentQty > 10) currentQty = 10;

    if (qtyDisplay) qtyDisplay.innerText = currentQty;
    
    const totalPrice = currentQty * BASE_PRICE;
    if (heroBtn) {
        heroBtn.innerText = `Order Now – Pay on Delivery (₹${totalPrice.toLocaleString('en-IN')}) 🚚`;
    }
}

// === Razorpay Integration ===
const RAZORPAY_KEY_ID = 'rzp_live_SVqQ4TpU5ZmVW4';
const SUPABASE_FUNCTION_URL = 'https://ziotlhrbsaaqdsxovhxh.supabase.co/functions/v1/razorpay-handler';

async function payWithRazorpay() {
    try {
        const totalAmount = currentQty * BASE_PRICE * 100; // in paise

        // Track Facebook InitiateCheckout Event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                value: currentQty * BASE_PRICE,
                currency: 'INR',
                content_name: 'Ultrasonic Humidifier',
                num_items: currentQty
            });
        }

        // Show loading state
        const originalText = event?.target?.innerText || 'Buy Now';
        if (event?.target) event.target.innerText = 'Creating Order...';

        const response = await fetch(SUPABASE_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'createOrder',
                amount: totalAmount,
                customer: { name: 'AIBrainX Landing Page Customer' }
            })
        });

        const order = await response.json();
        if (order.error) throw new Error(order.error);

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'AIBrainX',
            description: `Ultrasonic Humidifier (Qty: ${currentQty})`,
            order_id: order.id,
            handler: async function (response) {
                // Verify payment on backend
                await fetch(SUPABASE_FUNCTION_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'verifyPayment',
                        order_id: order.id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    })
                });

                showPaymentSuccess(response.razorpay_payment_id);
                
                // Track Facebook Purchase Event
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Purchase', {
                        value: currentQty * BASE_PRICE,
                        currency: 'INR',
                        content_name: 'Ultrasonic Humidifier',
                        content_category: 'Smart Living',
                        num_items: currentQty
                    });
                }
                
                // WhatsApp Automation
                const whatsappMsg = encodeURIComponent(`🎉 New Order Confirmed!\nOrder ID: ${response.razorpay_payment_id}\nProduct: Ultrasonic Humidifier\nQuantity: ${currentQty}\nTotal Amount: ₹${currentQty * BASE_PRICE}\n\nPlease ship my order soon!`);
                setTimeout(() => window.open(`https://wa.me/918770615061?text=${whatsappMsg}`, '_blank'), 1500);
            },
            prefill: {
                name: "",
                email: "",
                contact: ""
            },
            theme: { color: '#2d6a4f' }
        };

        const rzp = new Razorpay(options);
        rzp.open();
        
        // Reset button text
        if (event?.target) event.target.innerText = originalText;

    } catch (error) {
        alert("Payment Error: " + error.message);
        console.error(error);
    }
}

function showPaymentSuccess(paymentId) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.95);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        text-align: center;
        padding: 20px;
    `;
    successDiv.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 20px;">✅</div>
        <h2 style="font-size: 32px; margin-bottom: 10px;">Order Placed Successfully!</h2>
        <p style="font-size: 18px; color: #a0a0a5; margin-bottom: 30px;">Thank you for shopping with AIBrainX. Your Payment ID is ${paymentId}</p>
        <button onclick="window.location.reload()" style="background: #2d6a4f; color: white; border: none; padding: 15px 40px; border-radius: 8px; font-weight: 700; cursor: pointer;">Continue Shopping</button>
    `;
    document.body.appendChild(successDiv);
}

// === Global Facebook Pixel Event Listeners ===
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.href && target.href.includes('wa.me')) {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {
                content_name: 'WhatsApp Support',
                source: target.className
            });
            console.log('📊 FB Pixel: Contact (WhatsApp) event tracked');
        }
    }
});
