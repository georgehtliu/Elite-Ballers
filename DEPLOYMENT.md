# 🚀 Deployment Guide for Elite Ballers

This guide covers multiple ways to deploy your static basketball game.

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

#### Method A: Drag & Drop (Fastest)
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop the `src` folder directly onto the Netlify dashboard
3. Your site will be live instantly at a URL like `your-site-name.netlify.app`

#### Method B: Git Integration (Automatic Updates)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and click "New site from Git"
3. Connect your GitHub repository
4. Build settings:
   - **Publish directory**: `src`
   - **Build command**: (leave empty - no build needed)
5. Click "Deploy site"
6. Every push to your repo will automatically update the live site!

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. In your project root, run:
   ```bash
   vercel
   ```
3. Follow the prompts, or:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - **Root Directory**: Leave as `.` (or set to `src` if needed)
   - Deploy!

### Option 3: GitHub Pages

1. Push your code to a GitHub repository
2. Go to your repository on GitHub
3. Click **Settings** → **Pages**
4. Under **Source**, select:
   - Branch: `main` or `master`
   - Folder: `/src`
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/Elite-Ballers/basketball.html`

**Note**: For GitHub Pages, you might need to adjust paths in `basketball.html` if images/scripts don't load correctly.

### Option 4: Cloudflare Pages (Free & Fast)

1. Push your code to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Navigate to **Pages** → **Create a project**
4. Connect your GitHub repository
5. Build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `src`
6. Click **Save and Deploy**

### Option 5: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Initialize:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - **Public directory**: `src`
   - **Single-page app**: No
4. Deploy:
   ```bash
   firebase deploy
   ```

## 🎯 Recommended Workflow

For the easiest experience, I recommend **Netlify with Git integration**:
- ✅ Free
- ✅ Automatic deployments on every push
- ✅ Custom domain support
- ✅ HTTPS by default
- ✅ No build step needed

## 🔧 Troubleshooting

### Images/Styles Not Loading?
- Check that all paths in `basketball.html` are relative (they already are: `./images/`, `style/`, `script/`)
- Make sure you're deploying the `src` folder, not the root directory

### Want a Custom Domain?
- Netlify/Vercel: Go to Site Settings → Domain → Add custom domain
- GitHub Pages: Go to Settings → Pages → Custom domain

## 📝 Notes

- All these services are **free** for static sites
- Your site will have HTTPS automatically
- You can set up custom domains on all platforms
- Netlify and Vercel support automatic deployments from Git pushes

