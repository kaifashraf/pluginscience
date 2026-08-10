You are building a production-grade, fully functional web platform and registration system for Plugin, an advanced drone engineering workshop brand. Plugin offers hands-on workshops, training modules, custom drone kits, and hardware components for custom quadcopter assembly, flight controller tuning, autonomous navigation (YOLOv8 & ultrasonic sensing), and FPV flight. The tech stack is strictly: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase (Auth + Database + Storage), and Razorpay for workshop seat bookings and kit purchases. The project must be deployable to Vercel with zero configuration issues.

This is NOT a template or mockup. Every feature must be wired to Supabase and fully functional.

---

## SECTION 0 — BRAND IDENTITY & POSITIONING

Plugin sits at the intersection of high-tech aerospace engineering, robotics, and hands-on hardware development. The brand voice is: technical, precise, engineered, futuristic, and encouraging for builders who want to build, code, and fly autonomous aerial vehicles.

- **Brand name**: Plugin
- **Brand tagline**: Engineer. Code. Fly.
- **Brand tone**: High-tech industrial, technical-premium. Think "aerospace development lab meets robotics studio." Confident, minimal copy — no fluffy marketing speak. Use phrases like "engineered for precision," "flight-tested," "real-time telemetry," "autonomous spatial awareness."
- **Primary product/service categories** (4 top-level offerings, each with its own page):
  1. **Workshops & Bootcamps** — Hands-on training programs (e.g., 2-Day Drone Assembly, FPV Flight Dynamics, Autonomous YOLOv8 Drone Coding).
  2. **Custom Drone Kits** — Carbon-fiber quadcopter DIY kits with motors, flight controllers, ESCs, and frame parts.
  3. **Hardware & Avionics** — Individual components (Flight Controllers, Brushless Motors, Ultrasonic Sensors, Cameras, LiPo Batteries, Propellers).
  4. **Software & Firmware Lab** — Digital downloads, custom PID tuning profiles, object detection scripts, and SDK tools.
- **Cross-category logic**: A user viewing a Workshop page should see "Recommended Gear & DIY Kits" pulling from Custom Drone Kits; a user buying a drone kit should see relevant Workshop Bootcamps and Hardware upgrades. Build a `related_categories` relationship to power this (see Section 4).
- **Do not** make fake safety or aviation authority claims (e.g., DGCA, FAA certifications) anywhere in placeholder copy or seed data unless explicitly supplied. Use neutral copy like "Designed to comply with local micro-drone hobbyist flight guidelines."

---

## SECTION 1 — UI DESIGN SYSTEM (HIGHEST PRIORITY)

The UI must look like it was designed by a top-tier aerospace engineering agency (think: a fusion of SpaceX mission control, a dark industrial robotics lab, and a modern developer tool site like Vercel/Linear). Dark, precise, high-contrast — never soft or pastel. Follow these rules with zero exceptions:

### Typography
- Use **Inter** for body text and **Orbitron** or **Rajdhani** (a technical/condensed display font) for hero headings, workshop titles, and technical labels — this reinforces the cybernetic/aerospace feel.
- Font sizes: Hero headings 56–80px, Section headings 36–48px, Item titles 18–22px, Body text 15–16px, Captions/labels 12–13px in uppercase tracked-out (letter-spacing: 0.15em) — labels should read like HUD telemetry tags ("SYS.01", "TELEMETRY", "BATTERY STATUS: 94%", "FIRMWARE v3.1.5").
- Line height: 1.1 for display headings, 1.6 for body text. Never use default line heights.

### Color Palette
- Primary background: **#0A0D12** (deep industrial dark). Secondary background: **#11161F** (charcoal laboratory panel).
- Surface/card background: **#161D2A** with a 1px hairline border `rgba(0,195,255,0.12)` and a soft ambient blue glow shadow on hover (`0 0 0 1px rgba(0,195,255,0.25), 0 20px 40px rgba(0,0,0,0.6)`).
- Primary text: **#F0F4F8** (off-white silver). Secondary text: **#8CA0B3** (cool cyan-grey).
- Accent color (signature Plugin electric blue — matches glowing telemetry and schematics): **#00C3FF** (or neon cyan `#00F0FF`). Used for CTAs, active states, pricing, glowing lines, and micro-interactions.
- Secondary accent (steel/amber): **#3A4D62** (secondary buttons) and **#FFB000** (warning/sensor highlights).
- Destructive/sale: **#FF3B3B**. Success: **#00E676**. Warning/low-seats: **#FFB000**.
- All storefront cards use background `#161D2A` on a `#0A0D12` page background. Avoid light background mode anywhere in the main site — this is a dark-mode-only brand. The admin panel uses a light workspace theme (see Section 3).

### Spacing & Layout
- Use an 8px grid system (8, 16, 24, 32, 48, 64, 80, 120).
- Maximum content width: 1480px, centered. Horizontal page padding: 64px on desktop, 20px on mobile.
- Section vertical padding: 96–140px. Negative space lets high-tech photography and canvas animations breathe.
- Grid: 4 columns on desktop, 2 on mobile, 3 on tablet. Grid gap: 24px. Sharp corners or minimal radius (max `4px` border-radius) — engineered hardware aesthetic.

### Micro-Interactions & Animations (Framer Motion)
Every interaction must feel tactile, precise, and like operating a flight HUD switch:

1. **Page transitions**: `AnimatePresence` with pages fading in (opacity 0→1) and sliding up (y: 16→0) over 0.35s with ease `[0.22, 1, 0.36, 1]`.
2. **Card hover**: Image scales to 1.04 over 0.5s. A thin cyan accent line draws in along the bottom edge (scaleX 0→1). The "Quick Register" or "View Specs" button slides up (y: 16→0, opacity 0→1).
3. **Add-to-cart / Reserve Seat effect**: Flying ghost animation scaling down to the cart/booking header icon, triggering a sharp pulse and expanding blue glow ring.
4. **Button interactions**: Scale to 0.97 on tap (`whileTap`), soft blue `box-shadow` pulse on hover.
5. **Scroll-triggered reveals**: `whileInView` with `staggerChildren: 0.07`, fading up (opacity 0→1, y: 24→0) over 0.5s.
6. **Cart/Booking drawer**: Slide-over panel from the right with backdrop-blur overlay.
7. **HUD Corner Brackets**: Thin animated corner-bracket reticles (`⌐ ⌐`) around primary CTAs and product cards that draw in on hover using SVG stroke path animation (`pathLength` 0→1, 0.3s).

---

## SECTION 1A — HERO SECTION: ANTI-GRAVITY DRONE ASSEMBLY REVEAL (CRITICAL FEATURE)

This is the central visual experience of the site. The owner has converted an animated video into a **frame sequence** and stored it in an **archived folder**. These frames show scattered drone parts hovering in darkness, magnetically snapping together, powering on, and floating in a steady hover.

Build the homepage hero as a **scroll-scrubbed (and autoplay-on-load) canvas frame sequence player** that makes the drone feel like it is assembling live in front of the user.

### 1A.1 — Asset preparation
- The user will extract their video frames from the **archived folder** and place them in `/public/hero/frames/`. Ensure the code expects sequential files (e.g., `frame-001.jpg` … `frame-270.jpg` or similar padding based on their extraction).
- Generate a low-res WebP preview set in `/public/hero/frames-lowres/` (~480px wide) for fast LCP, full-res JPGs (~1280px) for desktop. Provide a build script (`scripts/optimize-hero-frames.ts`) with `sharp` to batch-process the unzipped frames.
- Preload the first 20 frames eagerly via `<link rel="preload">`; lazy-stream the remainder with `requestIdleCallback`.

### 1A.2 — Playback behavior ("anti-gravity assembly" hero)
Build `HeroAntiGravityDrone.tsx`:
1. **On page load**: Autoplay the sequence once over **4.5 seconds** (or adjusted dynamically based on the user's frame count) using `requestAnimationFrame` driven by elapsed time.
2. **Scroll-scrubbed mode**: Pin the hero section (`100vh` to `180vh` scroll distance). Map scroll progress (0→1) directly to the frame index so scrolling down controls assembly/takeoff; scrolling up rewinds it.
3. **Resting state (Idle-Bob)**: If scrolling stops in the hovering range (the final ~40 frames), oscillate ±8 frames using a gentle sine-wave timer to simulate an anti-gravity hover effect.
4. **Reduced motion**: If `prefers-reduced-motion: reduce`, skip the animation and statically display a single assembled frame with a fade-in.
5. **Rendering**: Use a `<canvas>` element with `drawImage`, `devicePixelRatio` scaling, and an in-memory LRU cache pool (~40 frames max) to prevent memory bloating.

### 1A.3 — Surrounding hero layout
- Centered canvas on `#0A0D12` background blending seamlessly with ambient studio smoke/darkness.
- Overlay text (fades in **after** initial autoplay):
  - Label: `[ SYSTEM: PLUGIN ONLINE ]`
  - Heading: "PLUGIN"
  - Subheading: "Engineer. Code. Fly."
  - Primary CTA: "Reserve Workshop Seat" (with HUD corner brackets).
  - Secondary CTA: "Explore DIY Kits".
- Subtle pulsing scroll indicator chevron at bottom.

---

## SECTION 2 — STOREFRONT & WORKSHOP PAGES

### Homepage
- **Hero Section**: Canvas drone assembly sequence as detailed in Section 1A.
- **Shop by Category**: 4 tactile cards — Workshops & Bootcamps, DIY Drone Kits, Hardware & Avionics, Software & Firmware.
- **Featured Workshop Batches**: Upcoming live hands-on dates with remaining seat counter badges (e.g., "ONLY 4 SEATS LEFT").
- **Interactive Component Breakdown**: Exploded view interactive card highlighting Flight Controllers, Motors, and Ultrasonic Distance Sensing modules.
- **Field Tested / Flight Test Demo**: Full-width video showcase section featuring low-latency responses (<0.5s) and YOLOv8 obstacle awareness in action.
- **Gear Up Bundles**: Merchandised bundles (e.g., "Builder Bundle: Kit + Workshop Pass") pulled from Supabase `bundles`.
- **Newsletter Signup**: "Join the Flight Log" email capture stored in Supabase `subscribers`.
- **Trust Badges & Testimonials**: Infinite horizontal scroll of industry icons and student reviews (engineering students, hobbyists, drone pilots).

### Workshop & Product Listing Page (PLP)
- **Filters sidebar**: Category, price range, skill level (Beginner / Intermediate / Advanced), seat availability, component compatibility. Real-time Supabase query via URL params.
- **Sort dropdown**: Price low-high/high-low, date, popularity, rating.
- **Quick View Modal**: Instant specs, schedule, and registration preview without leaving PLP.

### Detail Page (PDP - Workshop & Hardware)
- **Breadcrumb navigation**: Home / Workshops / Autonomous Drone Bootcamp.
- **Image/Video Gallery**: Multi-angle shots, assembly videos, component diagrams.
- **Specs & Curriculum Accordion**:
  - For Workshops: Syllabus, prerequisites, tools provided, key outcomes (e.g., "Deploy YOLOv8 model," "PID loop tuning").
  - For Hardware/Kits: Weight (g), dimensions, input voltage, microcontroller chip, motor KV rating.
- **Seat / Variant Selector**:
  - Workshops: Batch date & location selector.
  - DIY Kits: Skill level package or motor size option.
- **Reserve / Add to Cart Button**: Full-width button triggering flying ghost animation.

### Cart & Multi-Step Checkout Page
- Drawer + dedicated `/cart` page with promo code input (validated against Supabase `coupons`).
- Multi-step checkout: Attendee Details / Shipping Address → Payment → Confirmation.
- Razorpay Checkout integration themed in dark industrial background with cyan button accents. Server-side HMAC signature verification on callback.

### User Account Dashboard
- Supabase Auth (Email/Password + Google OAuth).
- Dashboard sections: My Registered Workshops (with access passes & ticket QR codes), Order History, Saved Hardware Wishlist, Address Book, Profile Settings.

---

## SECTION 3 — ADMIN PANEL (/admin)

Separate light-theme layout (`#FFFFFF` sidebar, `#F8F9FA` background, `#00C3FF` / `#0B192C` active accents) protected by Supabase Auth (`role = 'admin'`).

- **Dashboard**: Revenue, total bookings, kit sales, active seats remaining, Recharts sales graphs.
- **Workshop & Product Management**: CRUD workshops and products with dynamic category spec fields (JSONB), seat limits, batch dates, and image drag-and-drop uploads to Supabase Storage `product-images`.
- **Orders & Registrations Management**: Filterable list of orders, payment statuses, fulfillment, attendee roster exports (CSV/Excel), and tracking number updates.
- **Coupons, Bundles, Settings & SEO**: Manage promo codes, homepage hero copy, site logos, Razorpay keys, and meta tags without touching code.

---

## SECTION 4 — SUPABASE DATABASE SCHEMA

SQL schema including tables with proper indexes, triggers, and Row Level Security (RLS):

1. **profiles**: id (FK auth.users), email, full_name, phone, avatar_url, role ('customer'|'admin').
2. **site_settings**: site_name, tagline, logo_url, currency_code, hero_headline, hero_subheading, hero_cta_text.
3. **categories**: id, name, slug, description, image_url, parent_id.
4. **products**: id, title, slug, description, category_id, price, sale_price, stock_quantity, is_workshop (bool), specs (jsonb), status ('draft'|'active').
5. **workshop_batches**: id, product_id (FK), batch_date, location, total_seats, booked_seats.
6. **product_images**: id, product_id (FK), image_url, sort_order.
7. **bundles**: id, name, discount_value, image_url, is_active.
8. **orders**: id, order_number (e.g. "PLUGIN-10001"), user_id, email, totals, payment_status, fulfillment_status, razorpay_order_id, razorpay_payment_id, tracking_number.
9. **order_items**: id, order_id (FK), product_id (FK), batch_id (FK, nullable), quantity, unit_price.
10. **reviews**, **coupons**, **subscribers**, **wishlist**, **media**.

---

## SECTION 5 — TECHNICAL & DEPLOYMENT REQUIREMENTS

- **Framework**: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Supabase, Razorpay SDK.
- **Project Structure**:
  - `/app/(storefront)` — Homepage, PLP, PDP, Checkout, Account.
  - `/app/(admin)` — Dashboard, Products, Registrations, Settings.
  - `/app/api/` — Razorpay order creation and webhook handlers.
  - `/public/hero/frames/` — Destination folder for the extracted images from the user's **archived folder**.
  - `/scripts/optimize-hero-frames.ts` — Sharp compression script to process the extracted frames.
- **Razorpay Server Verification**: Verify all payment signatures server-side using `crypto` HMAC before marking orders as paid.
- Include `.env.example`, `vercel.json`, and `README.md` with instructions on unzipping the **archived folder** into `/public/hero/frames/` and executing schema migrations.

---

## SECTION 6 — IMPLEMENTATION ORDER

1. Initialize Next.js 14 + Tailwind CSS + Framer Motion.
2. Set up Supabase client, SQL migration file, and Auth Provider.
3. Build the UI design system components (Button, Input, Modal, Toast, HUD Brackets, Skeleton).
4. Build `HeroAntiGravityDrone.tsx` frame sequence player with scroll-scrubbing, autoplay, and idle-bob.
5. Implement storefront layout (Header with dynamic logo, Footer, CartDrawer).
6. Build Homepage, PLP, PDP, and Checkout with Razorpay integration.
7. Build User Dashboard and Admin Panel (/admin).
8. Add search modal, polish loading states, and finalize error/empty states.

Write complete, fully-functional code files without placeholders or "// TODO" comments.
VISUAL REFERENCE KEYWORDS FOR UI QUALITY
The storefront should visually feel like a blend of SpaceX mission control telemetry