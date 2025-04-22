import { SignIn } from "@clerk/nextjs";
import { FadeIn } from "@/components/animations";

export default function SignInPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <FadeIn>
        <div className="w-full max-w-md mx-auto">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-md rounded-xl border border-gray-200 dark:border-gray-800"
              }
            }}
          />
        </div>
      </FadeIn>
    </div>
  );
} 