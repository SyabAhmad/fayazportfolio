# Deployment Guide

## Vercel Deployment

1. **Connect your GitHub repository** to Vercel
2. **Configure build settings**:

   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (if needed):

   - Node.js version: 18.x or higher

4. **Redeploy** after making these changes

## Alternative: Netlify Deployment

If using Netlify:

- The `_redirects` file in `public/` will handle SPA routing
- Build command: `npm run build`
- Publish directory: `dist`

## Troubleshooting

- Clear Vercel cache and redeploy
- Check build logs for errors
- Ensure all dependencies are listed in package.json
- Verify that the `dist` folder contains all necessary files
