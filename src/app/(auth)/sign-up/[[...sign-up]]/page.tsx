"use client";

import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
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
    if (!values.email.trim()) newErrors.email = "Email is required.";
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
    } catch (err: unknown) {
      console.error(err);
      const clerkErr = err as { errors?: { code: string; message: string }[] };
      if (clerkErr.errors?.length) {
        clerkErr.errors.forEach((error) => {
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
    } catch (err: unknown) {
      console.error(err);
      const clerkErr = err as { errors?: { code: string; message: string }[] };
      if (clerkErr.errors?.length) {
        clerkErr.errors.forEach((error) => {
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
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {/* Background glow */}

      <div className="relative w-full max-w-xl">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 space-y-6">

          {verifying ? (
            <>
              {/* Verify Header */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <svg className="stroke-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                  </svg>
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-semibold text-white">Check your email</h1>
                  <p className="text-sm text-neutral-400 mt-1">
                    Enter the verification code sent to your email
                  </p>
                </div>
              </div>

              {/* Verify Form */}
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-code`} className="text-sm text-neutral-300">
                    Verification code
                  </Label>
                  <Input
                    id={`${id}-code`}
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="h-11 text-center text-lg tracking-[0.5em] rounded-xl border border-white/10 bg-white/[0.05] text-white placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                    maxLength={6}
                  />
                  {errors.general && (
                    <p className="text-xs text-red-400">{errors.general}</p>
                  )}
                  {successMessage && (
                    <p className="text-xs text-green-400">{successMessage}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isVerifying || code.length !== 6}
                  className="w-full h-11 rounded-xl bg-white font-semibold text-black hover:bg-neutral-200 transition-all"
                >
                  {isVerifying ? "Verifying..." : "Verify email"}
                </Button>
              </form>

              <p className="text-center text-sm text-neutral-400">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="font-medium text-white hover:underline"
                >
                  Resend code
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Sign Up Header */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <h1 className="text-xl font-semibold text-white">Create your account</h1>
                  <p className="text-sm text-neutral-400 mt-1">Enter your details to get started</p>
                </div>
              </div>

              {/* Sign Up Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <Label className="text-sm text-neutral-300">Email</Label>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-white/[0.05] text-white placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm text-neutral-300">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-white/[0.05] text-white placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {errors.general}
                  </div>
                )}

                <div id="clerk-captcha" />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-white font-semibold text-black hover:bg-neutral-200 transition-all"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => signUpWith("oauth_google")}
                  className="w-full h-11 rounded-xl border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] transition-all flex items-center gap-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-neutral-400">
                  Already have an account?{" "}
                  <a href="/sign-in" className="text-white font-medium hover:underline">
                    Sign in
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}