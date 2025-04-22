# Google Authentication Setup Guide

This guide will help you set up Google authentication for your FuelFlow application.

## Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

## Steps to Set Up Google Authentication

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Enter a name for your project (e.g., "FuelFlow")
4. Click "Create"

### 2. Enable the Google OAuth API

1. In your project, navigate to "APIs & Services" > "Library"
2. Search for "Google OAuth API" and select it
3. Click "Enable"

### 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you're using Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - App name: "FuelFlow"
   - User support email: Your email
   - Developer contact information: Your email
5. Click "Save and Continue"
6. Skip adding scopes and click "Save and Continue"
7. Add test users if needed, then click "Save and Continue"
8. Review your settings and click "Back to Dashboard"

### 4. Create OAuth Client ID

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: "FuelFlow Web Client"
5. Add Authorized JavaScript origins:
   - Development: `http://localhost:3000`
   - Production: `https://your-production-domain.com`
6. Add Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-production-domain.com/api/auth/callback/google`
7. Click "Create"
8. Note your Client ID and Client Secret

### 5. Configure Environment Variables

1. In your project's root directory, create or update `.env.local` file
2. Add the following environment variables:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here # Generate a secure random string

# Google Authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

For production:
- Update `NEXTAUTH_URL` to your production URL
- Generate a secure random string for `NEXTAUTH_SECRET` (you can use `openssl rand -base64 32` in terminal)

### 6. Testing Authentication

1. Start your development server with `npm run dev`
2. Navigate to your sign-in page
3. Click "Sign in with Google"
4. You should be redirected to Google's authentication page
5. After successful authentication, you'll be redirected back to your application

## Troubleshooting

- If you encounter an error related to the redirect URI, make sure the URI in your Google Cloud Console exactly matches the callback URL in your application
- Check that your environment variables are properly loaded
- Verify that you've enabled the Google OAuth API
- Make sure your OAuth consent screen is configured correctly

For more detailed information, refer to:
- [NextAuth.js Documentation](https://next-auth.js.org/providers/google)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2) 