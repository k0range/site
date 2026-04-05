<div align="center">

<img src="./public/favicon.svg" height=100 /> 
<h1>Korange's Site (2026)</h1>
</div>

## ✨️ Features
- Profile and social links
- Blog functionality
  - Uses emojis as eye-catching images
- Supports [NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md)
- Supports Web Key Directory
  - Can serve public keys for GnuPG from this site
- Aggregates articles written on other platforms
  - Currently manual addition, but automation using RSS is planned
- Timeline page to view activities
- Smooth animations
- Multilingual support (Japanese and English)
- Admin authentication/Admin dashboard
- etc

### 💻️ Features in Development

As soon as these are finished, I'll integrate them with the [current site](https://korange.work/).

- Contact form
- Email display button with CAPTCHA for spam protection
- Donation page (Page exists, but the recipient is undecided)
- License page (License has not been decided yet)
- Like and comment functionality for articles
- URL shortening service (Struggling with how to implement analytics)
- Enhancing content for the Work page
- etc

## 🛠️ Technology
- TypeScript
- Next.js (App Router)
  - Considering a migration to vinext
- Tailwind CSS
- Better Auth (For Admin page authentication)
- Prisma (for database access)
  - Features requiring a database are currently WIP
