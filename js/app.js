/* ========================================
   AIBrainX Product Website - JavaScript
   Razorpay + WhatsApp + Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === Navbar Scroll Behavior ===
    const navbar = document.getElementById('navbar');
    const announcementBar = document.querySelector('.announcement-bar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.position = 'fixed';
            announcementBar.style.top = '0';
            announcementBar.style.left = '0';
            announcementBar.style.right = '0';
            announcementBar.style.zIndex = '999';
        } else {
            navbar.classList.remove('scrolled');
            announcementBar.style.transform = 'translateY(0)';
            announcementBar.style.position = 'relative';
        }

        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Mobile Menu ===
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // === Gallery Image Switcher ===
    const galleryMain = document.getElementById('galleryMainImg');
    const thumbs = document.querySelectorAll('.thumb');

    if (galleryMain) {
        galleryMain.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('data-img');
            galleryMain.style.opacity = '0';
            galleryMain.style.transform = 'scale(0.95)';

            setTimeout(() => {
                galleryMain.src = imgSrc;
                galleryMain.style.opacity = '1';
                galleryMain.style.transform = 'scale(1)';
            }, 250);

            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // === Stats Counter Animation ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = stat.getAttribute('data-decimal') === 'true';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }

                if (isDecimal) {
                    stat.textContent = current.toFixed(1);
                } else if (target >= 1000) {
                    stat.textContent = Math.floor(current).toLocaleString('en-IN') + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // === Scroll-triggered Animations ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-bar') && !statsAnimated) {
                    statsAnimated = true;
                    animateCounters();
                }

                if (entry.target.classList.contains('feature-card')) {
                    const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }

                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) observer.observe(statsBar);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.use-case-card, .review-card, .box-item, .faq-item, .step-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // === Section Entrance Animations ===
    const sections = document.querySelectorAll('.features, .gallery, .use-cases, .specifications, .box-contents, .reviews, .faq, .buy-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // === Smooth Scroll for Navigation Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Hero Image Parallax Effect ===
    const heroImg = document.getElementById('heroImg');
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768 || !heroImg) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroImg.style.transform = `translateY(${-15 + y * 0.3}px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`;
    });

    // === Button Ripple Effect ===
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    console.log('🧠 AIBrainX Product Page Loaded Successfully');
});


// === Razorpay Configuration ===
const RAZORPAY_KEY_ID = 'rzp_live_SVqQ4TpU5ZmVW4';
const SUPABASE_FUNCTION_URL = 'https://ziotlhrbsaaqdsxovhxh.supabase.co/functions/v1/razorpay-handler';

// === Hero Quantity Selector ===
function updateHeroQty(delta) {
    const qtyInput = document.getElementById('productQuantity');
    const priceDisplay = document.getElementById('btnTotalPrice');
    if (!qtyInput || !priceDisplay) return;

    let newQty = parseInt(qtyInput.value) + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > 10) newQty = 10;
    
    qtyInput.value = newQty;
    const totalPrice = newQty * 399;
    priceDisplay.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
}

async function payWithRazorpay() {
    try {
        const qtyInput = document.getElementById('productQuantity');
        const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
        const totalAmount = quantity * 39900; // in paise

        const response = await fetch(SUPABASE_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'createOrder',
                amount: totalAmount,
                customer: { name: 'AIBrainX Customer' }
            })
        });

        const order = await response.json();
        if (order.error) throw new Error(order.error);

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'AIBrainX',
            description: 'Ultrasonic Cool Mist Humidifier',
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
                
                // WhatsApp Notification
                const whatsappMsg = encodeURIComponent(`🎉 New Order!\nID: ${response.razorpay_payment_id}\nProduct: Humidifier\nQty: ${quantity}\nAmt: ₹${quantity * 399}`);
                setTimeout(() => window.open(`https://wa.me/918770615061?text=${whatsappMsg}`, '_blank'), 2000);
            },
            theme: { color: '#2d6a4f' }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function showPaymentSuccess(paymentId) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    overlay.innerHTML = `
        <div style="
            background: #1c2333;
            border: 1px solid rgba(45, 106, 79, 0.3);
            border-radius: 20px;
            padding: 48px;
            text-align: center;
            max-width: 440px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(45, 106, 79, 0.2);
            animation: scaleIn 0.4s ease;
        ">
            <div style="font-size: 4rem; margin-bottom: 16px;">🎉</div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; font-weight: 700; color: #f0f6fc; margin-bottom: 10px;">
                Payment Successful!
            </h2>
            <p style="color: #8b949e; font-size: 0.95rem; margin-bottom: 20px; line-height: 1.6;">
                Thank you for your purchase! Your order has been confirmed.
            </p>
            <p style="
                background: rgba(45, 106, 79, 0.15);
                border: 1px solid rgba(45, 106, 79, 0.25);
                padding: 10px 16px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 0.85rem;
                color: #52b788;
                margin-bottom: 24px;
            ">
                Payment ID: ${paymentId}
            </p>
            <p style="color: #8b949e; font-size: 0.85rem; margin-bottom: 20px;">
                📲 Redirecting to WhatsApp to share delivery details...
            </p>
            <button onclick="this.closest('div').parentElement.remove()" style="
                background: linear-gradient(135deg, #2d6a4f, #40916c);
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 28px;
                font-family: 'Outfit', sans-serif;
                font-weight: 600;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (overlay.parentElement) overlay.remove();
    }, 10000);
}

function showPaymentError(message) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    overlay.innerHTML = `
        <div style="
            background: #1c2333;
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 20px;
            padding: 48px;
            text-align: center;
            max-width: 440px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
            <div style="font-size: 3rem; margin-bottom: 16px;">❌</div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; color: #f0f6fc; margin-bottom: 10px;">
                Payment Failed
            </h2>
            <p style="color: #8b949e; font-size: 0.92rem; margin-bottom: 20px;">
                ${message || 'Something went wrong. Please try again.'}
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button onclick="this.closest('div').parentElement.parentElement.remove(); payWithRazorpay();" style="
                    background: linear-gradient(135deg, #2d6a4f, #40916c);
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 28px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    Try Again
                </button>
                <a href="https://wa.me/918770615061?text=Hi!%20I%20tried%20paying%20online%20but%20it%20failed.%20Can%20I%20order%20via%20COD?" target="_blank" style="
                    color: #25D366;
                    font-weight: 600;
                    font-family: 'Outfit', sans-serif;
                ">
                    💬 Order via WhatsApp instead
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

/* ========================================
   CART & CHECKOUT LOGIC (AROMAHAVEN)
   ======================================== */

let cart = JSON.parse(localStorage.getItem('aromaCart')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function saveCart() {
    localStorage.setItem('aromaCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, name, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, img, quantity: 1 });
    }
    saveCart();
    showToast(`${name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    showToast('Item removed!');
}

function updateQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
            renderOrderSummary();
        }
    }
}

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
                <a href="index.html#products" class="btn btn-primary">Go to Products</a>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    let html = '<div class="cart-items">';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <div class="cart-item-total">₹${itemTotal.toLocaleString('en-IN')}</div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
            </div>
        `;
    });

    html += `
        </div>
        <div class="cart-summary">
            <div class="summary-details">
                <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
                <div class="summary-row"><span>Shipping</span><span>FREE</span></div>
                <div class="summary-total"><span>Total</span><span class="price">₹${subtotal.toLocaleString('en-IN')}</span></div>
            </div>
            <a href="checkout.html" class="btn btn-primary btn-full">Proceed to Checkout</a>
        </div>
    `;
    cartContent.innerHTML = html;
}

function renderOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    if (!orderItems) return;

    let subtotal = 0;
    let html = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${itemTotal.toLocaleString('en-IN')}</span>
            </div>
        `;
    });

    orderItems.innerHTML = html;
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const totalEl = document.getElementById('checkoutTotal');
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    return subtotal;
}

async function initiatePayment() {
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        showToast('Please fill all details!', 'error');
        return;
    }

    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    const payBtn = document.getElementById('payBtn');
    const payText = document.getElementById('payText');
    const spinner = document.getElementById('paySpinner');

    payBtn.disabled = true;
    payText.style.opacity = '0';
    spinner.style.display = 'block';

    const amount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    try {
        // 1. Create Order on Backend
        const response = await fetch(SUPABASE_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'createOrder',
                amount: amount * 100,
                customer: { name, phone, address }
            })
        });

        const order = await response.json();
        if (order.error) throw new Error(order.error);

        // 2. Open Razorpay Checkout
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'AromaHaven',
            description: 'Premium Diffusers & Oils',
            order_id: order.id,
            handler: async function (response) {
                // 3. Verify Payment on Backend
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

                spinner.style.display = 'none';
                payText.style.opacity = '1';
                payBtn.disabled = false;
                
                showSuccessModal(response.razorpay_payment_id);
                cart = [];
                saveCart();
            },
            prefill: { name, contact: phone },
            theme: { color: '#2d6a4f' },
            modal: {
                ondismiss: function () {
                    spinner.style.display = 'none';
                    payText.style.opacity = '1';
                    payBtn.disabled = false;
                }
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (e) {
        showToast(e.message, 'error');
        payBtn.disabled = false;
        spinner.style.display = 'none';
        payText.style.opacity = '1';
    }
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.className = `toast visible ${type}`;
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

function showSuccessModal(paymentId) {
    const modal = document.getElementById('successModal');
    const msg = document.getElementById('modalMsg');
    if (modal) {
        if (msg) msg.textContent = `Thank you! Your payment ID is ${paymentId}. Your order is confirmed and will be delivered within 5-7 business days.`;
        modal.classList.add('active');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    renderOrderSummary();
});

// Animation Keyframes for Toast and Modal
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        padding: 12px 24px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    .toast.visible {
        transform: translateY(0);
        opacity: 1;
    }
    .toast.error {
        border-color: #ef4444;
    }
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(10px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    .modal-overlay.active {
        display: flex;
    }
    .btn-full {
        width: 100%;
        justify-content: center;
        margin-top: 20px;
    }
    #paySpinner {
        display: none;
        width: 24px;
        height: 24px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -12px;
        margin-top: -12px;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(extraStyles);
