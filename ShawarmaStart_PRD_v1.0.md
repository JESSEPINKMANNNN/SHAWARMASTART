# 🌯 ShawarmaStart — Product Requirements Document

**Version:** 1.0 — Initial Draft
**Date:** April 2026
**Status:** Planning Phase
**Owner:** ShawarmaStart Product Team
**Type:** Product Requirements Document (PRD)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Competitive & Inspiration Reference](#3-competitive--inspiration-reference)
4. [Feature List & Priorities](#4-feature-list--priorities)
5. [Tech Stack & Architecture](#5-tech-stack--architecture)
6. [Design & Branding Guidelines](#6-design--branding-guidelines)
7. [Success Metrics](#7-success-metrics)

---

## 1. Executive Summary

ShawarmaStart is a modern online ordering and food delivery platform designed to bring authentic, crave-worthy shawarma directly to customers' doors. The platform will offer a seamless end-to-end experience — from browsing a curated menu to real-time delivery tracking — optimized for mobile-first users in urban markets.

This PRD defines the vision, user personas, feature scope, technical architecture, and branding guidelines for the v1.0 launch of the ShawarmaStart web platform.

### Goals

- Enable customers to browse the menu, customize orders, and pay online
- Reduce order friction to under 3 minutes from landing page to confirmation
- Support delivery and pickup order types at launch
- Build a recognizable, appetizing brand presence that drives repeat orders
- Lay a scalable technical foundation for future multi-location expansion

---

## 2. Problem Statement

Customers today expect the convenience of ordering food online with minimal steps and maximum transparency. Many shawarma and quick-service restaurants still rely on third-party aggregators (Foodpanda, Careem, Uber Eats) which charge 20–30% commission per order and create a brand disconnect.

ShawarmaStart needs its own direct ordering channel to:

- Own the customer relationship and data
- Eliminate heavy third-party commission fees
- Provide a branded, memorable ordering experience
- Enable loyalty programs and repeat-order incentives

---

## 3. Competitive & Inspiration Reference

Three sites were reviewed as direct design and UX references for this project.

### 3.1 Shelby's — [shelbys.ca](https://shelbys.ca)

Shelby's is a Canadian shawarma brand with an exceptionally strong personality. Everything on the site — copy, layout, photography — is dialled into a distinct brand voice. Key takeaways:

| What They Do | What We Borrow |
|---|---|
| Playful, ownable brand language ("Wrab", "Brotein", "Za Culture") | ShawarmaStart should have a distinct voice — not corporate, not generic |
| Editorial-quality food photography, full bleed and immersive | Hero and menu sections must be photography-first, not icon-first |
| Menu presented as a storytelling moment, not just a list | Each menu item should have a name, a short personality-filled description, and a great photo |
| Strong cultural identity woven into the brand | Lean into the Lahore/Pakistani-Arab heritage angle — it's a differentiator |
| "Order Now" CTA is persistent and hard to miss | Sticky header CTA on all pages |

> **Design mood:** Bold · Warm · Personality-forward · Street-food energy with editorial craft

---

### 3.2 Sultan Shawarma — [sultanshawarma.com](https://sultanshawarma.com)

Tagline: *"Your Cravings Deserve a Sultan."* Positions itself as premium and confident. Takeaways:

| What They Do | What We Borrow |
|---|---|
| Premium positioning through language alone | ShawarmaStart's copy should feel confident and slightly elevated |
| Royalty/status concept applied to fast food | Could work for a "signature" or "legendary" tier on the menu |

> **Design mood:** Premium · Confident · Aspirational

---

### 3.3 ShawarmaStop — [shawarmastop.co](https://www.shawarmastop.co) *(Lahore competitor)*

A competing Lahore shawarma brand. Studying it shows what's table-stakes in this market — and exactly where ShawarmaStart pulls ahead.

| What They Have | ShawarmaStart's Opportunity |
|---|---|
| Clean, photo-forward homepage (Framer) | Match the visual quality, exceed it with stronger brand voice |
| Multiple Lahore locations (DHA, Lake City, Gulberg, PIA Housing) | Make location selection frictionless — auto-detect or one tap |
| Minimal nav: Home / Menu / Contact | ShawarmaStart goes further — ordering, tracking, account, all built in |
| Good food photography (Arabi, Kafta, Platters) | Invest in hero-quality food photography from day one |
| Opens 12:30 PM – 2:00 AM daily | Surface hours clearly with real-time open/closed state |
| No online ordering — phone call only | **This is the gap. ShawarmaStart owns it with a full ordering engine.** |
| No cart, checkout, or payment flow | Full cart, checkout, JazzCash/Easypaisa/COD at launch |
| No item customization | Protein, bread, sauces, extras — all customizable |
| No order tracking | Real-time status updates (Received → Preparing → On the Way) |

> **ShawarmaStop proves the Lahore market exists. ShawarmaStart is the version with everything they're missing.**

---

### 3.4 Consolidated Design Direction

Based on all three references, the new ShawarmaStart platform should aim for:

- **Shelby's energy** — bold personality, immersive food photography, ownable brand voice
- **Sultan's confidence** — copy that positions ShawarmaStart as *the* spot, not just *a* spot
- **Current site's warmth** — keep the approachable, local feel; don't over-corporatize
- **Order-first architecture** — every page should funnel toward placing an order

---


## 4. Feature List & Priorities

**Priority Key:** `P0 — Must` · `P1 — Should` · `P2 — Nice to Have`

### 4.1 Customer-Facing Features

| Feature | Description | Priority | Phase |
|---|---|---|---|
| Home & Menu | Appetizing landing page with categories, featured items, and promotions | P0 — Must | Phase 1 |
| Item Detail & Customization | Choose protein, bread, toppings, sauces; add special notes | P0 — Must | Phase 1 |
| Cart & Checkout | Add/remove items, apply promo codes, review order total | P0 — Must | Phase 1 |
| Delivery / Pickup Toggle | Switch between home delivery and in-store pickup at checkout | P0 — Must | Phase 1 |
| Payment Gateway | Credit/debit card, JazzCash, Easypaisa, COD | P0 — Must | Phase 1 |
| Order Confirmation | Email + SMS confirmation with estimated delivery time | P0 — Must | Phase 1 |
| Order Tracking | Live status page showing preparation and delivery stages | P1 — Should | Phase 1 |
| User Accounts | Register/login, save addresses, view order history | P1 — Should | Phase 1 |
| Ratings & Reviews | Rate items and delivery experience post-order | P1 — Should | Phase 2 |
| Loyalty Points | Earn points per order, redeem for discounts | P2 — Nice | Phase 2 |
| Referral Program | Share referral link, earn credit on first friend order | P2 — Nice | Phase 2 |
| Push Notifications | Order updates, deals, and re-engagement via browser/app push | P2 — Nice | Phase 2 |

### 4.2 Admin / Operations Features

| Feature | Description | Priority | Phase |
|---|---|---|---|
| Order Dashboard | Real-time queue of incoming orders with status controls | P0 — Must | Phase 1 |
| Menu Management | Add/edit/delete items, categories, pricing, and photos | P0 — Must | Phase 1 |
| Availability Toggle | Mark items or entire menu as unavailable instantly | P0 — Must | Phase 1 |
| Promo Code Manager | Create, activate, and expire discount codes | P1 — Should | Phase 1 |
| Customer Management | View customer profiles, order history, and contact info | P1 — Should | Phase 1 |
| Sales Reports | Daily/weekly revenue, top items, peak hours analytics | P1 — Should | Phase 2 |
| Delivery Zone Config | Set delivery radius, minimum order, and delivery fees by zone | P1 — Should | Phase 1 |
| Multi-location Support | Manage multiple branches from one admin account | P2 — Nice | Phase 3 |

---

## 5. Tech Stack & Architecture

### 5.1 Recommended Stack

| Layer | Technology / Tool | Rationale |
|---|---|---|
| **Frontend** | Next.js 14 (React) | SEO-friendly SSR, fast page loads, great DX |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design tokens |
| **Backend / API** | Node.js + Express or Next.js API Routes | Unified JS stack, easy deployment |
| **Database** | PostgreSQL (via Supabase or Railway) | Relational data for orders, menus, users; scalable |
| **Auth** | NextAuth.js or Supabase Auth | OAuth (Google) + email/password, JWT sessions |
| **Payments** | Stripe + JazzCash / Easypaisa integration | Covers card and local wallet payments |
| **File Storage** | Cloudinary or Supabase Storage | Menu item images, optimized delivery |
| **Realtime** | Pusher or Supabase Realtime | Live order status updates for customers & kitchen |
| **SMS / Email** | Twilio (SMS) + Resend or SendGrid (email) | Order confirmations and notifications |
| **Hosting** | Vercel (frontend) + Railway or Render (backend) | Low ops overhead, auto-scaling |
| **Analytics** | PostHog or Mixpanel | Track conversions, drop-offs, and user behavior |
| **Maps / Geocoding** | Google Maps Platform | Delivery address validation, distance calculation |

### 5.2 Architecture Overview

The platform follows a lightweight monorepo structure with a clear separation between the customer-facing storefront, the admin dashboard, and the API layer.

- **Customer Storefront (Next.js)** — SSR pages for menu, cart, checkout, and tracking
- **Admin Dashboard (Next.js)** — Protected routes for restaurant staff
- **API Layer (Next.js API Routes or Express)** — RESTful endpoints for orders, menu, auth
- **Database (PostgreSQL)** — Orders, users, menu items, promotions, delivery zones
- **Realtime Layer (Supabase/Pusher)** — Websocket events for order status changes
- **Third-party Integrations** — Payment gateways, SMS, email, maps

### 5.3 Non-Functional Requirements

- Page load time under 2 seconds on mobile (4G connection)
- 99.9% uptime SLA, especially during peak dinner hours (7–10 PM)
- PCI-compliant payment handling — no raw card data stored
- GDPR/PDPA-aware data handling for customer personal data
- Mobile-first responsive design — minimum screen width 320px

---

## 6. Design & Branding Guidelines

### 6.1 Brand Identity

ShawarmaStart's brand communicates bold flavor, speed, and authenticity. The visual identity should evoke warmth, appetite, and urban energy without feeling heavy or outdated.

| Swatch | Name | Hex | Usage |
|---|---|---|---|
| 🔴 | Fiery Red | `#C0392B` | Primary brand color, CTAs, accents |
| ⚫ | Rich Black | `#1A1A1A` | Text, headers, nav |
| 🟡 | Warm Gold | `#F1C40F` | Highlights, badges, special offers |
| ⚪ | Off-White | `#FDF8F4` | Page backgrounds |

### 6.2 Typography

- **Headlines:** Poppins Bold — punchy, modern, highly legible
- **Body / UI:** Inter or DM Sans — clean, readable at small sizes
- **Minimum body font size:** 14px on mobile · 16px on desktop

### 6.3 UX Design Principles

- **Food-first design** — large, full-bleed food photography above the fold (reference: Shelby's immersive hero)
- **Personality in every word** — menu item descriptions should be mouth-watering and slightly playful, never generic (reference: Shelby's "Wrab", Sultan's "Your Cravings Deserve a Sultan")
- **Minimal steps** — checkout must be achievable in 3 taps/clicks maximum
- **Clear CTAs** — "Order Now", "Add to Cart", "Track Order" always visible; sticky in header (reference: Shelby's persistent order button)
- **Persistent cart** — cart icon with item count always visible in header
- **Trust signals** — estimated delivery time, payment security badges, reviews
- **Lahore-local feel** — lean into the brand's Lahore roots; neighbourhoods, timings (12:30 PM – 2:00 AM), and familiar references (reference: shawarmastart.co's local warmth)
- **Dark mode** — optional, Phase 2

### 6.4 Key Pages & Wireframe Notes

| Page | Notes |
|---|---|
| **Home** | Hero banner with promo, category pills (Wraps, Plates, Sides, Drinks), featured items grid |
| **Menu** | Filterable grid by category; item cards with photo, name, price, "Add" button |
| **Item Detail** | Full photo, description, customization options, quantity, "Add to Cart" |
| **Cart** | Item list with edit/remove, promo code field, order summary, checkout CTA |
| **Checkout** | Address (autofill via Google), order type toggle, payment method, confirm |
| **Order Status** | Progress stepper (Received → Preparing → On the Way → Delivered) + estimated ETA |
| **Admin Dashboard** | Order queue cards, status dropdowns, revenue snapshot widget |

---


*ShawarmaStart — PRD v1.0 · Confidential · April 2026*
