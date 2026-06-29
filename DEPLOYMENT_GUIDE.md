# Blonde Pines Camp Website - Deployment Guide

## Overview
You have a fully functional React site deployed on Vercel (free hosting, zero Netlify nonsense). The site includes:
- Password-protected entry (BIGBLONDEBLOWOUT)
- Smart RSVP matching logic for couples and solos
- Email notifications to both your email addresses
- Beautiful 1979 camp aesthetic with rotating images
- Countdown timer to camp
- All 6 pages (RSVP, Schedule, Travel, FAQs, Camp Lore, Map)

---

## Quick Start: Deploy to Vercel

### Step 1: Prepare Your Files
Save these files to a folder called `blonde-pines`:
- `blonde-pines-site.jsx` (rename to `src/App.jsx`)
- `api/submit-rsvp.js`
- `package.json`
- `vercel.json`

### Step 2: Create GitHub Repo
1. Go to github.com and create a new repository (e.g., `blonde-pines-camp`)
2. Clone it locally
3. Copy your files into the repo
4. Commit and push:
```bash
git add .
git commit -m "Initial commit: Blonde Pines website"
git push origin main
```

### Step 3: Connect to Vercel
1. Go to vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repo
5. Select "Other" as the framework
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click "Deploy"

### Step 4: Set Up Environment Variables
In Vercel dashboard:
1. Go to your project settings
2. Click "Environment Variables"
3. Add two variables:

**EMAIL_USER**: blondepinescamp@gmail.com
**EMAIL_PASSWORD**: [your Gmail app password]

**How to get Gmail app password:**
1. Go to myaccount.google.com
2. Click "Security" (left sidebar)
3. Scroll to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy that into EMAIL_PASSWORD

**IMPORTANT**: Use blondepinescamp@gmail.com for sending emails. Make sure you have access to this account.

---

## Domain Setup (Optional)

### Use Your Existing Domain
If you want to use blondepines.com (currently on Namecheap):

1. **In Vercel Dashboard:**
   - Project settings → Domains
   - Add Domain: blondepines.com
   - Choose "Assign Domain"
   - Vercel will show you nameserver instructions

2. **In Namecheap:**
   - Go to your domain settings
   - Change nameservers to Vercel's nameservers
   - Wait 24-48 hours for propagation

(The other option: keep it on Namecheap and point DNS records, but Vercel's way is simpler.)

---

## Testing RSVP Email Functionality

1. Deploy the site to Vercel
2. Go to your site URL
3. Enter password: `BIGBLONDEBLOWOUT`
4. Search for a guest (try "Alex Kuehr")
5. Fill out the form and submit
6. Check your email in 2-3 seconds

If emails don't arrive:
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASSWORD in Vercel env vars
- Check Vercel deployment logs for errors

---

## Customizing Content

### Rotate Images on RSVP Page
The site currently rotates 3 placeholder images. To use your own:

In `blonde-pines-site.jsx`, find the `rotatingSrc` array:
```javascript
const rotatingSrc = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
];
```

Replace with URLs to your camp photos. You can:
- Upload to imgur.com (free, no account needed)
- Upload to your Vercel project's public folder
- Use direct image URLs

### Fill in Camp Lore & Map
- Find the "Camp Lore" and "Map" page sections (search `currentPage === 'lore'`)
- Replace placeholder text with your content
- For the map: either embed a Google Map or upload an image

### Update Footer/About
Add text, links, or additional sections by editing the JSX and adding new navigation items.

---

## Editing the Site Later

### Option 1: Edit on GitHub (Simple)
1. Go to github.com → your repo
2. Find the file you want to edit
3. Click the pencil icon
4. Make changes
5. Commit → Vercel auto-deploys in ~1 minute

### Option 2: Edit Locally (More Control)
```bash
# Clone the repo
git clone https://github.com/yourusername/blonde-pines-camp.git
cd blonde-pines-camp

# Install dependencies
npm install

# Start local dev server
npm run dev

# Make edits, test locally
# Then push to GitHub
git add .
git commit -m "Update content"
git push
```

---

## Troubleshooting

**Site shows blank page:**
- Check Vercel deployment logs (Deployments tab)
- Verify React component syntax
- Clear browser cache

**RSVP emails not arriving:**
- Check spam folder
- Verify Gmail app password is correct
- Check Vercel function logs for errors
- Confirm EMAIL_USER variable is set

**Password not working:**
- Password is case-sensitive: `BIGBLONDEBLOWOUT`
- Clear browser cache if you changed it

**Guests not matching:**
- Name matching is case-insensitive but must be spelled exactly as in CSV
- Try searching by last name only if first name is common

---

## Support & Next Steps

**To add content:**
- Edit `api/submit-rsvp.js` if you want to change email formatting
- Add new pages by creating new sections in the JSX
- Customize colors by changing hex codes in the style props

**Domain questions:**
- Keep your Namecheap account for domain renewal
- Vercel handles hosting, DNS points to Vercel

**Backup & versioning:**
- GitHub is your backup and version history
- Never lose your code or ability to make changes

---

## File Structure (Final)
```
blonde-pines-camp/
├── src/
│   └── App.jsx              (main React component)
├── api/
│   └── submit-rsvp.js       (email handler)
├── public/                   (optional: add images here)
├── package.json
├── vercel.json
├── vite.config.js           (optional, created by Vite)
└── README.md
```

---

**You're all set! No more Netlify. No more build failures. Just camp.**
