# Sunny Sips — Website Project
> **Tagline:** *"A Brighter Kind of Refreshment."*  
> **Brand Concept:** Youth-oriented fruit beverage startup takeaway outlet in Bengaluru, India.

---

## 📁 Project Structure

```text
sunny-sips/
├── index.html           # 1. Home Page (Hero, Value Strip, Menu Preview, Why Sunny Sips, Social Feed & Instagram Grid, CTA)
├── about.html           # 2. About Page (Story, Mission, Core Values, Audience, Brand Vibe Illustration, CTA)
├── menu.html            # 3. Menu Page (4 ranges: Fruit Coolers, Lemon Days, Tea Time, Happy Blends, Takeaway Note, Order CTA)
├── contact.html         # 4. Contact Page (Enquiry Form, Bengaluru Outlet Details, Map Block, Sunshine Club Newsletter, CTA)
├── README.md            # Project documentation and placeholder replacement guide
├── css/
│   └── style.css        # Responsive design system, WCAG AA contrast, Google Fonts, pill buttons, soft cards
├── js/
│   ├── config.js        # SINGLE PLACE to update your social links, phone, address, and placeholders!
│   └── main.js          # Sticky header, mobile hamburger menu, active page highlight, form validation & alerts
└── assets/
    └── images/
        ├── logo.svg           # Brand wordmark in deep-green with sun & curved smile (ready for your uploaded logo swap)
        ├── favicon.svg        # Browser tab favicon with smiling sun motif
        ├── motif-divider.svg  # Subtle sun & smile section divider
        ├── hero-drink.svg     # Large sunny takeaway fruit drink card
        ├── cooler-card.svg    # Fruit Coolers category artwork (Tangerine accent)
        ├── lemonade-card.svg  # Lemon Days lemonades category artwork (Sunshine Yellow accent)
        ├── tea-card.svg       # Tea Time iced teas category artwork (Coral accent & Blue straw)
        ├── blend-card.svg     # Happy Blends smoothies category artwork (Fresh Green accent)
        ├── about-vibe.svg     # Brand vibe takeaway counter illustration
        ├── insta-1.svg        # Instagram preview tile 1 (Friends toasting takeaway cups)
        ├── insta-2.svg        # Instagram preview tile 2 (Citrus flatlay)
        ├── insta-3.svg        # Instagram preview tile 3 (College study desk break)
        ├── insta-4.svg        # Instagram preview tile 4 (Berry iced tea break)
        ├── insta-5.svg        # Instagram preview tile 5 (Takeaway grab-and-go counter)
        └── insta-6.svg        # Instagram preview tile 6 (4 ranges lineup)
```

---

## 🚀 How to Preview the Website

1. **Option 1 (Direct in Browser):**
   Simply double-click `index.html` (or right-click -> "Open with" -> Chrome / Edge / Firefox / Safari).
   Every link, image, style, and script works directly offline and online.

2. **Option 2 (Live Server or Python HTTP Server):**
   In terminal:
   ```powershell
   cd "C:\Users\Sneha Sridhar\.gemini\antigravity\scratch\sunny-sips"
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your web browser.

---

## 🎨 Visual Design System Applied

- **Colours:**
  - Sunshine Yellow: `#FFC629`
  - Tangerine: `#FF941F`
  - Coral: `#FF7770`
  - Fresh Green: `#347B43`
  - Blue (small accents only): `#3265AE`
  - Warm Cream background: `#FFF4DF`
  - Text: Deep Green `#13301B` / Near-Black (WCAG AA compliant contrast on all backgrounds)
- **Typography:**
  - Headlines & Logo: **Fredoka Bold**
  - Body Text: **Poppins**
  - Promotional accents & Taglines: **Pacifico**
  *(Loaded directly from Google Fonts with seamless system font fallbacks)*
- **Logo & Motifs:**
  - Vector SVG logo created with the "Sunny Sips" rounded bold wordmark in deep green, radiant sun above, and curved smile underneath.
  - To swap in your uploaded logo file: simply overwrite `assets/images/logo.svg` with your file or update the `<img>` `src` attribute.

---

## ⚙️ Updating Placeholders in ONE Single Place

You can update almost all placeholders directly inside `js/config.js` without touching multiple HTML files!

Open `js/config.js`:
```javascript
const SUNNY_SIPS_CONFIG = {
  social: {
    instagramUrl: "https://instagram.com/yourhandle",
    secondPlatformName: "Facebook",
    secondPlatformUrl: "https://facebook.com/yourhandle",
    hashtag: "#SunnySipsBengaluru"
  },
  outlet: {
    address: "Shop 4, 80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034",
    hours: "Monday - Sunday: 10:30 AM - 10:30 PM",
    phoneWhatsApp: "+91 98765 43210",
    email: "hello@sunnysips.in",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Sunny+Sips+Bengaluru"
  },
  ordering: {
    orderNowUrl: "https://wa.me/919876543210?text=Hi%20Sunny%20Sips!%20I%20would%20like%20to%20order"
  },
  about: {
    founderNames: "Sneha & Co-Founders",
    founderBackground: "Bengaluru college students passionate about wholesome fruit drinks"
  }
};
```
