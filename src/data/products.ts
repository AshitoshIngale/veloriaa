import type { Product } from "@/lib/site";

/* ---------------------------------------------------------------------------
   VELORIAA catalog — the real pieces from the studio's Instagram grid.
   Every entry was imported from the official posts export
   (veloriaa_posts.csv) with the original photos and post links.

   HOW TO EDIT
   • Add a piece   → copy any block, change slug/name/blurb/description,
                     images (drop files in /public/images/ig/) and postLink.
   • Hide a piece  → set active: false.
   • Reorder       → change sort (lower numbers appear first).
--------------------------------------------------------------------------- */

export const products: Product[] = [
  {
    "slug": "colour-therapy",
    "name": "Colour Therapy",
    "tag": "Bracelets",
    "blurb": "A little color therapy for your wrist — pick your happy shade.",
    "description": "Four moods, four palettes — emerald and ivory, blossom pink with satin bows, meadow green with tiny charms, and a deep sea-glass teal. Every strand is hand-strung, knotted and finished to last. Tell us your shade on Instagram DM and we'll string it fresh for you.",
    "images": [
      "/images/ig/post-2-1.jpg",
      "/images/ig/post-2-2.jpg",
      "/images/ig/post-2-3.jpg",
      "/images/ig/post-2-4.jpg"
    ],
    "postLink": "https://www.instagram.com/p/De18OU4j0er/",
    "sort": 1,
    "active": true
  },
  {
    "slug": "a-little-luxury",
    "name": "A Little Luxury",
    "tag": "Hangers",
    "blurb": "A hanger wrapped in pearls and silk bows — a little luxury for your wardrobe.",
    "description": "A hanger hand-wrapped in luminous pearl strands and finished with a cream silk bow — too pretty to hide in the closet. Hang your favourite pieces on a little luxury, or gift it to someone who loves pretty things. DM us for availability and we'll make yours to order.",
    "images": [
      "/images/ig/post-5-1.jpg",
      "/images/ig/post-5-2.jpg",
      "/images/ig/post-5-3.jpg"
    ],
    "postLink": "https://www.instagram.com/p/Ddy7kPhD3wH/",
    "sort": 2,
    "active": true
  },
  {
    "slug": "bunch-of-happiness",
    "name": "A Bunch of Happiness",
    "tag": "Bag Charms",
    "blurb": "A little bunch of happiness — juicy grape beads on a golden clasp.",
    "description": "Plump glass grapes in violet and blush, strung with pearls and finished with a sturdy gold clasp. Clip it to your bag or your keys and carry a little orchard with you. Available in the colours shown — DM us to pick yours.",
    "images": [
      "/images/ig/post-7-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DdEFsQPCJ7V/",
    "sort": 3,
    "active": true
  },
  {
    "slug": "aqua-and-pearls",
    "name": "Aqua & Pearls",
    "tag": "Phone Charms",
    "blurb": "A little touch of aqua, pearls & love — handmade just for you.",
    "description": "Sea-blue beads, clear crystal bows and a scatter of pearls — looped by hand and finished with a secure phone strap. A drop of the ocean for your everyday carry. DM us on Instagram to order.",
    "images": [
      "/images/ig/post-10-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DcWSfeqj4gw/",
    "sort": 4,
    "active": true
  },
  {
    "slug": "forever-friendship-band",
    "name": "Forever Friendship Band",
    "tag": "Friendship Bands",
    "blurb": "Celebrate your forever friendship with a cute friendship band!",
    "description": "Soft pastel strands with your initials worked right into the beads — one for you, one for your person. Made to be worn, swapped and kept forever. Tell us your initials and colours on DM and we'll string your set.",
    "images": [
      "/images/ig/post-15-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DbFqCXOD_uY/",
    "sort": 5,
    "active": true
  },
  {
    "slug": "sunshine-you-can-wear",
    "name": "Sunshine You Can Wear",
    "tag": "Bracelets",
    "blurb": "Daisy-bright beads that make even grey days feel golden.",
    "description": "A single strand of sunshine — cheerful beads with tiny daisies that sit like blooms around your wrist. Made in small batches, so no two are ever quite the same. DM us to claim yours.",
    "images": [
      "/images/ig/post-3-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DeM6Gz4vZPR/",
    "sort": 6,
    "active": true
  },
  {
    "slug": "the-everyday-necklace",
    "name": "The Everyday Necklace",
    "tag": "Necklaces",
    "blurb": "POV: you found the necklace that makes every outfit look better.",
    "description": "A light, happy strand of colour that sits just right — the necklace you'll reach for without thinking. It layers beautifully and travels well. DM us and we'll make one in your palette.",
    "images": [
      "/images/ig/post-13-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DbyJ0OVj2xD/",
    "sort": 7,
    "active": true
  },
  {
    "slug": "the-cherry-charm",
    "name": "The Cherry Charm",
    "tag": "Bag Charms",
    "blurb": "Carry a little charm wherever you go — glass cherries on gold.",
    "description": "Glossy glass cherries with enamel leaves, swinging from a polished gold clasp. Sweet, a little retro, and entirely handmade. Clip it on and go — DM us to order.",
    "images": [
      "/images/ig/post-20-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DaHk4MRgjbg/",
    "sort": 8,
    "active": true
  },
  {
    "slug": "the-bloom-phone-charm",
    "name": "The Bloom Phone Charm",
    "tag": "Phone Charms",
    "blurb": "The cutest little accessory your phone needed.",
    "description": "Tiny glass tulips and blossoms on a hand-beaded strap — the upgrade your phone has been waiting for. Light, sturdy and one of a kind. DM us your favourite flower colours.",
    "images": [
      "/images/ig/post-8-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/Dc7vgLej1rG/",
    "sort": 9,
    "active": true
  },
  {
    "slug": "stack-it",
    "name": "Your Sign to Stack It",
    "tag": "Bracelets",
    "blurb": "Contrast strands with gold clasps, made to be layered.",
    "description": "Ivory pearls and black-gold strands with polished clasps — designed to stack, made to mix. Wear one, wear five; they only get better together. DM us your stack and we'll string it.",
    "images": [
      "/images/ig/post-6-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DdtsTKdy8Cg/",
    "sort": 10,
    "active": true
  },
  {
    "slug": "a-little-sparkle",
    "name": "A Little Sparkle",
    "tag": "Bracelets",
    "blurb": "A little sparkle, a lot of elegance — handcrafted with love.",
    "description": "Pearls, soft rose and crystal strands that catch the light as you move — elegance you can wear every day. Stack them or keep one solo. DM us on Instagram to order yours.",
    "images": [
      "/images/ig/post-9-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/Dc1h7fFkef4/",
    "sort": 11,
    "active": true
  },
  {
    "slug": "the-pink-loop",
    "name": "The Pink Loop",
    "tag": "Phone Charms",
    "blurb": "Carry a little charm everywhere — a rosy loop for your phone.",
    "description": "A hand-looped strand of rosy beads with a bow finish, made to slip through your case or strap. Pretty, practical and impossibly photogenic. DM us to order.",
    "images": [
      "/images/ig/post-21-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DaF03FUjzzF/",
    "sort": 12,
    "active": true
  },
  {
    "slug": "pastel-pieces",
    "name": "Pastel Pieces",
    "tag": "Bracelets",
    "blurb": "Pastel pieces for your everyday kind of magic.",
    "description": "Soft lilac, powder blue and rose beads with little heart charms — the quiet kind of pretty that goes with everything. Layer them, gift them, live in them. Message us on Instagram to order.",
    "images": [
      "/images/ig/post-4-1.jpg",
      "/images/ig/post-4-2.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DeHv_XrD32n/",
    "sort": 13,
    "active": true
  },
  {
    "slug": "a-little-spring",
    "name": "A Little Spring",
    "tag": "Bracelets",
    "blurb": "Wear a little spring wherever you go.",
    "description": "Pearls with a single enameled blossom in rose and leaf-green — the first flower of the season, on your wrist all year. Strung to order in your size. DM us on Instagram.",
    "images": [
      "/images/ig/post-17-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DaxvSdHgIr8/",
    "sort": 14,
    "active": true
  },
  {
    "slug": "the-critter-club",
    "name": "The Critter Club",
    "tag": "Phone Charms",
    "blurb": "Cute phone charms, available now — pick your tiny companion.",
    "description": "A penguin, a bunny, a whale and friends — each one beaded by hand on a sturdy strap. Choose your favourite or adopt the whole club. DM us on Instagram to order.",
    "images": [
      "/images/ig/post-11-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DcG0cBMj0_p/",
    "sort": 15,
    "active": true
  },
  {
    "slug": "happiness-to-go",
    "name": "Happiness, To Go",
    "tag": "Bag Charms",
    "blurb": "A little bunch of happiness, made to go wherever you go.",
    "description": "Lilac and lavender beads with pearls and a grape charm — clipped to a gold clasp that's ready for travel. Your bag's new best friend. DM us to order.",
    "images": [
      "/images/ig/post-16-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DbBIXtXCLDy/",
    "sort": 16,
    "active": true
  },
  {
    "slug": "in-every-colour",
    "name": "In Every Colour",
    "tag": "Phone Charms",
    "blurb": "Available in different colours — your favourite, beaded by hand.",
    "description": "Our signature bow-and-bead loop in the shade of your choice — sky blue shown here, more colours on request. Tell us your colour on Instagram DM and we'll string it.",
    "images": [
      "/images/ig/post-12-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DcEGSGTj3JJ/",
    "sort": 17,
    "active": true
  },
  {
    "slug": "elegance-in-bloom",
    "name": "Elegance in Bloom",
    "tag": "Necklaces",
    "blurb": "Veloriaa — where elegance blooms.",
    "description": "A whisper-fine chain with tiny blossoms that rest like dewdrops at your collarbone. Understated, luminous and entirely handmade. DM us on Instagram to make it yours.",
    "images": [
      "/images/ig/post-14-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DbbOU23D5yp/",
    "sort": 18,
    "active": true
  },
  {
    "slug": "everyday-aesthetic",
    "name": "Everyday Aesthetic",
    "tag": "Phone Charms",
    "blurb": "Handcrafted accessories for your everyday aesthetic.",
    "description": "Powder-pink beads and satin bows, looped to fit your phone — soft colour for hard-working days. Made to order in the shades you love. DM us to order.",
    "images": [
      "/images/ig/post-18-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DapkQ_xjweW/",
    "sort": 19,
    "active": true
  },
  {
    "slug": "matching-moments",
    "name": "Matching Moments",
    "tag": "Bracelets",
    "blurb": "Matching moments, lasting memories — twin strands for two.",
    "description": "Two bracelets strung in contrasting black, pink and ivory — one for you, one for your favourite person. Photographed on the pages of a love story; made to be yours. DM us and we'll size them together.",
    "images": [
      "/images/ig/post-1-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DfMNDT-vKLC/",
    "sort": 20,
    "active": true
  },
  {
    "slug": "the-everyday-favourite",
    "name": "The Everyday Favourite",
    "tag": "Bracelets",
    "blurb": "Cute, minimal & handmade — your new everyday favourite bracelet.",
    "description": "Shades of blue in three minimal strands — navy, powder and white — that go with everything you own. Light on the wrist, big on charm. DM us to pick your shade.",
    "images": [
      "/images/ig/post-19-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DalPupmgKG4/",
    "sort": 21,
    "active": true
  },
  {
    "slug": "elegance-in-every-bead",
    "name": "Elegance in Every Bead",
    "tag": "Bracelets",
    "blurb": "Elegance in every bead — strung one by one, just for you.",
    "description": "A strand where elegance lives in the details — every bead chosen and strung by hand until the whole piece feels quiet, balanced and entirely yours. Message us on DM and we'll make it in your favourite colours.",
    "images": [
      "/images/ig/post-22-1.jpg"
    ],
    "postLink": "https://www.instagram.com/p/DZj2gJ2AMC_/",
    "sort": 22,
    "active": true
  }
];
