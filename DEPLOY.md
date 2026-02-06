# Angular Portfolio - Deployment Guide

## 1. Vercel Configuration
1. **GitHub**: Push this repository to GitHub.
2. **Vercel**: Import the project.
3. **Build Settings**: Vercel should auto-detect Angular.
   - Build Command: `ng build`
   - Output Directory: `dist/rami-portfolio` (or check `angular.json` output path)

## 2. Environment Variables
Add these to Vercel Project Settings > Environment Variables:

| Variable | Description |
|----------|-------------|
| `SENDGRID_API_KEY` | SendGrid API Key (starts with `SG.`) |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v2 Secret Key |
| `FROM_EMAIL` | Verified Sender Email in SendGrid |
| `TO_EMAIL` | Your personal email (ramibenothmen15@gmail.com) |

## 3. Local Development with API
To test the API locally, you need `vercel dev`:
```bash
npm install -g vercel
vercel login
vercel dev
```

## 4. Updates
- Edit `src/assets/data/content.json` to update text, projects, and skills without coding.
- Commit and push to deploy updates automatically.
