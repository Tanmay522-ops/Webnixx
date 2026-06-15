"use client";

import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useState, useId } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface SignUpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SignUp({ open, onOpenChange }: SignUpProps) {
  const id = useId();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = (values: { email: string; password: string }) => {
    const newErrors: typeof errors = {};

    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUp) return;

    const isValid = validateForm({ email: emailAddress, password });
    if (!isValid) return;

    try {
      setIsLoading(true);
      setErrors({});

      const result = await signUp.password({ emailAddress, password });

      if (result.error) throw result.error;

      const verificationResult = await signUp.verifications.sendEmailCode();
      if (verificationResult.error) throw verificationResult.error;

      setVerifying(true);
    } catch (err: any) {
      console.error(err);
      if (err.errors?.length > 0) {
        err.errors.forEach((error: any) => {
          switch (error.code) {
            case "form_password_length_too_short":
              setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters." }));
              break;
            case "form_password_pwned":
              setErrors((prev) => ({ ...prev, password: "Password is too weak." }));
              break;
            case "form_identifier_exists":
              setErrors((prev) => ({ ...prev, email: "Email already exists." }));
              break;
            default:
              setErrors((prev) => ({ ...prev, general: error.message || "Authentication failed" }));
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUp) return;

    try {
      setIsVerifying(true);

      const verifyResult = await signUp.verifications.verifyEmailCode({ code });
      if (verifyResult.error) throw verifyResult.error;

      const finalizeResult = await signUp.finalize();
      if (finalizeResult.error) throw finalizeResult.error;

      router.push("/callback");
    } catch (err: any) {
      console.error(err);
      if (err.errors?.length > 0) {
        err.errors.forEach((error: any) => {
          switch (error.code) {
            case "form_code_incorrect":
              setErrors((prev) => ({ ...prev, general: "Incorrect verification code" }));
              break;
            default:
              setErrors((prev) => ({ ...prev, general: error.message || "Verification failed" }));
          }
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!signUp) return;
    try {
      const resendResult = await signUp.verifications.sendEmailCode();
      if (resendResult.error) throw resendResult.error;
      setSuccessMessage("Verification code resent");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to resend verification code." });
    }
  };

  const signUpWith = async (strategy: OAuthStrategy) => {
    if (!signUp) return;
    try {
      await signUp.sso({
        strategy,
        redirectUrl: "/callback",
        redirectCallbackUrl: "/callback",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>


      <DialogContent className="bg-black border border-white/10 text-white"
        onInteractOutside={(e) => e.preventDefault()} 
      >
        {/* ── Verification view ── */}
        {verifying ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-white">
                Verify your email
              </DialogTitle>
              <DialogDescription className="text-center text-neutral-400">
                Enter the verification code sent to your email
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-code`} className="text-sm text-neutral-200">
                  Verification code
                </Label>
                <Input
                  id={`${id}-code`}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="h-12 text-center text-lg tracking-widest rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                  maxLength={6}
                />
                {errors.general && (
                  <p className="text-sm text-red-500">{errors.general}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-green-500">{successMessage}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isVerifying || code.length !== 6}
                className="w-full h-12 rounded-xl bg-white font-semibold text-black transition-all hover:bg-neutral-200"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </form>

            <div className="text-center text-sm text-neutral-400">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="font-medium text-white hover:underline"
              >
                Resend code
              </button>
            </div>
          </>
        ) : (
          /* ── Sign-up view ── */
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-white">
                Create your account
              </DialogTitle>
              <DialogDescription className="text-center text-neutral-400">
                Enter your details below to create your account
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm text-neutral-200">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-sm text-neutral-200">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                />
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* General Error */}
              {errors.general && (
                <p className="text-sm text-red-400">{errors.general}</p>
              )}

              {/* Clerk Captcha */}
              <div id="clerk-captcha" />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 rounded-xl bg-white font-semibold text-black transition-all hover:bg-neutral-200"
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-neutral-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                onClick={() => signUpWith("oauth_google")}
                className="h-12 rounded-xl border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              >
                Continue with Google
              </Button>

              {/* Footer */}
              <div className="text-center text-sm text-neutral-400">
                Already have an account?{" "}
                  <a href="/sign-in?dialog=true" className="font-medium text-white hover:underline">
                  Sign In
                </a>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}