# Deployment Guide for Portfolio Website

This guide will help you deploy your portfolio website to Vercel using GitHub integration.

## Step 1: Push Your Code to GitHub

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com) and login to your account
   - Click on the "+" icon in the top right and select "New repository"
   - Name your repository (e.g., "portfolio-website")
   - Choose whether it's public or private
   - Click "Create repository"

2. **Initialize Git in your project (if not already done)**:
   ```bash
   git init
   ```

3. **Add all files to Git**:
   ```bash
   git add .
   ```

4. **Commit the changes**:
   ```bash
   git commit -m "Initial commit"
   ```

5. **Add the GitHub repository as a remote**:
   ```bash
   git remote add origin https://github.com/yourusername/your-repository-name.git
   ```

6. **Push to GitHub**:
   ```bash
   git push -u origin main
   # Or if you're using 'master' branch:
   # git push -u origin master
   ```

## Step 2: Deploy to Vercel

1. **Create a Vercel account**:
   - Go to [Vercel](https://vercel.com) and sign up (you can sign up using your GitHub account)

2. **Import your GitHub repository**:
   - Once logged in, click "Add New..." and select "Project"
   - Connect to your GitHub account if not already connected
   - Select the repository you just created
   - Vercel will automatically detect the project type

3. **Configure project settings**:
   - **Framework Preset**: Select "Other" or "Next.js" depending on your setup
   - **Build Command**: `npm run build` (this should be correct by default)
   - **Output Directory**: `dist` (this should be correct by default)
   - **Environment Variables**: Add any environment variables needed for your project

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your website

5. **Custom domain (optional)**:
   - Go to your project dashboard in Vercel
   - Click on "Settings" and then "Domains"
   - Add your custom domain and follow the instructions to configure DNS settings

## Step 3: Continuous Deployment

Your website will now automatically redeploy whenever you push changes to your GitHub repository. To update your site:

1. Make changes to your code locally
2. Commit the changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```
4. Vercel will automatically detect the changes and redeploy your site

## Troubleshooting

- **Build Errors**: Check the build logs in Vercel to diagnose any errors.
- **Preview Deployments**: Vercel creates preview deployments for pull requests, allowing you to test changes before merging.
- **Environment Variables**: Ensure all required environment variables are set in Vercel project settings.

## Benefits of Vercel Deployment

- **HTTPS by default**: All Vercel deployments come with SSL certificates.
- **Global CDN**: Your site will be served from edge locations around the world.
- **Analytics**: Vercel provides basic analytics for your website.
- **Serverless Functions**: If you need backend functionality, Vercel supports serverless functions.