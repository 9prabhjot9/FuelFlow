# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your FuelFlow application.

## Prerequisites

- A Clerk account (sign up at [clerk.com](https://clerk.com))
- Your Next.js application

## Steps to Set Up Clerk Authentication

### 1. Create a Clerk Application

1. Sign up or log in to [Clerk's Dashboard](https://dashboard.clerk.com)
2. Click on "Add Application"
3. Name your application (e.g., "FuelFlow")
4. Choose your authentication strategy (e.g., Email/Password, Social logins)
5. Click "Create Application"

### 2. Configure Authentication Methods

1. In your Clerk Dashboard, navigate to "Authentication" in the sidebar
2. Enable the authentication methods you want to offer (Email, Google, etc.)
3. For social providers (like Google), you'll need to:
   - Create OAuth credentials on the provider's platform
   - Add the redirect URIs from Clerk to the provider
   - Copy the Client ID and Secret back to Clerk

### 3. Install Clerk in Your Next.js App

```bash
npm install @clerk/nextjs
```

Or with legacy peer dependencies if you encounter conflicts:

```bash
npm install @clerk/nextjs --legacy-peer-deps
```

### 4. Add Environment Variables

Create or update your `.env.local` file with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

You can find your API keys in the Clerk Dashboard under "API Keys".

### 5. Set Up Clerk Middleware

Create or update a `middleware.ts` file in your project root:

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

### 6. Add ClerkProvider to Your App

Update your providers in `app/providers.tsx` or create it if it doesn't exist:

```tsx
"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ClerkProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ClerkProvider>
  )
}
```

### 7. Create Sign-In and Sign-Up Pages

Create sign-in and sign-up pages in the correct locations:

For sign-in (`app/sign-in/page.tsx`):

```tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <SignIn />
      </div>
    </div>
  );
}
```

For sign-up (`app/sign-up/page.tsx`):

```tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <SignUp />
      </div>
    </div>
  );
}
```

### 8. Use Clerk's Authentication Hooks

In your components, use Clerk's authentication hooks:

```tsx
import { useAuth, useUser } from "@clerk/nextjs";

function MyComponent() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return <div>Hello, {user.firstName}</div>;
}
```

### 9. Protect Routes

For pages that require authentication:

```tsx
"use client"

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    redirect("/sign-in?redirect_url=/protected-page");
  }
  
  return <div>Protected Content</div>;
}
```

### 10. Add Sign-In and Sign-Out Buttons

For sign-in:

```tsx
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <SignInButton mode="modal">
      <Button>Sign in</Button>
    </SignInButton>
  );
}
```

For sign-out:

```tsx
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <SignOutButton>
      <Button>Sign out</Button>
    </SignOutButton>
  );
}
```

## Customizing the Appearance

You can customize the appearance of Clerk's components:

```tsx
<SignIn
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-md rounded-xl border border-gray-200 dark:border-gray-800",
      formButtonPrimary: "bg-teal-600 hover:bg-teal-700"
    }
  }}
/>
```

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Guide](https://clerk.com/docs/nextjs/overview)
- [Clerk Component Reference](https://clerk.com/docs/components/overview)
- [Clerk Hooks Reference](https://clerk.com/docs/references/react/use-auth) 