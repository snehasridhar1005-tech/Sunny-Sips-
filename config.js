/**
 * Sunny Sips / On The Bright Side - Central Configuration
 * ========================================================
 * Real brand details, outlet operations, menu pricing, and campaign settings.
 */

const SUNNY_SIPS_CONFIG = {
  // Brand Identity
  brand: {
    name: "Sunny Sips",
    projectTitle: "ON THE BRIGHT SIDE",
    tagline: "A Brighter Kind of Refreshment.",
    campaignTagline: "Play for fun. Compete for the crown."
  },

  // Social Media Links & Campaign Hashtag
  social: {
    instagramUrl: "https://www.instagram.com/sunn_ysips?cnvx=amljZXV2Nnp0anFl",
    instagramHandle: "@sunn_ysips",
    secondPlatformName: "Facebook",
    secondPlatformUrl: "https://www.facebook.com/share/19qTxBv3h9/",
    hashtag: "#OnTheBrightSideBLR"
  },

  // Outlet & Contact Details (HSR Layout, Bengaluru)
  outlet: {
    address: "27th Main Road, Sector 2, HSR Layout, Bengaluru, Karnataka – 560102",
    shortAddress: "Sector 2, HSR Layout, Bengaluru",
    hours: "10:00 AM – 10:00 PM",
    workingDays: "Monday – Sunday (All 7 days)",
    phoneWhatsApp: "+91 00000 00000",
    phoneDisplay: "+91 00000 00000",
    email: "hello@sunnysips.in",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=27th+Main+Road,+Sector+2,+HSR+Layout,+Bengaluru,+Karnataka+560102&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=27th+Main+Road,+Sector+2,+HSR+Layout,+Bengaluru,+Karnataka+560102"
  },

  // Online Ordering & Action
  ordering: {
    orderNowText: "Order Now",
    orderNowUrl: "https://wa.me/910000000000?text=Hi%20Sunny%20Sips!%20I%20would%20like%20to%20order%20from%20HSR%20Layout%20outlet"
  },

  // About Founders & Christ University Background
  about: {
    founderNames: "Vaishnavi Somasundaram & Sneha Sridhar",
    founderInstitute: "CHRIST (Deemed to be University), Bengaluru",
    founderDegree: "BBA Students",
    founderStory: "We are two aspiring entrepreneurs and BBA students from CHRIST (Deemed to be University), Bengaluru, with a shared passion for business, creativity and entrepreneurship. As young individuals ourselves, we understand the need for refreshing, affordable and exciting beverage options. This inspired us to create ON THE BRIGHT SIDE, a youth-oriented brand that aims to make everyday drink breaks more enjoyable through fun flavours, fresh drinks and a vibrant experience. Our goal is to build a brand that brings people together, one refreshing sip at a time!"
  },

  // Drink Sizes
  sizes: [
    { id: "250ml", name: "Regular", volume: "250 ml", badge: "Small serving" },
    { id: "350ml", name: "Medium", volume: "350 ml", badge: "Popular choice" },
    { id: "500ml", name: "Large", volume: "500 ml", badge: "Extra refreshment" }
  ]
};

if (typeof window !== 'undefined') {
  window.SUNNY_SIPS_CONFIG = SUNNY_SIPS_CONFIG;
}
