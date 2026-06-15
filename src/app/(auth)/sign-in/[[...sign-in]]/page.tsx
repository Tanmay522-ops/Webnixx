"use client";

import { useClerk, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "next/navigation";
import { useState, useId } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SignIn({ open, onOpenChange }: SignInProps) {
    const id = useId();
    const { signIn } = useSignIn();
    const { signOut } = useClerk();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        general?: string;
    }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signIn) return;
        setErrors({});
        setIsLoading(true);

        try {
            const { error } = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (error) throw error;

            toast.success("Login successful!");
            onOpenChange(false);
            router.push("/callback");
        } catch (err: any) {
            console.error(err);
            if (err.errors?.length > 0) {
                err.errors.forEach((error: any) => {
                    switch (error.code) {
                        case "form_password_incorrect":
                            setErrors((prev) => ({ ...prev, password: "Incorrect password." }));
                            break;
                        case "form_identifier_not_found":
                            setErrors((prev) => ({ ...prev, email: "No account found with this email." }));
                            break;
                        case "strategy_for_user_invalid":
                            setErrors((prev) => ({ ...prev, general: "This account only supports Google Sign In." }));
                            break;
                        default:
                            setErrors((prev) => ({ ...prev, general: error.message || "Authentication failed." }));
                    }
                });
            } else {
                setErrors({ general: "An unexpected error occurred." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signInWith = async (strategy: OAuthStrategy) => {
        try {
            if (!signIn) return;
            await signOut();
            await signIn.sso({
                strategy,
                redirectUrl: "/callback",
                redirectCallbackUrl: "/callback",
            });
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black border border-white/10 text-white"
                onInteractOutside={(e) => e.preventDefault()}  
            >
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>

                    <DialogHeader>
                        <DialogTitle className="sm:text-center text-white">
                            Welcome Back
                        </DialogTitle>
                        <DialogDescription className="sm:text-center text-neutral-400">
                            Login to continue to Sellnix
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`${id}-email`} className="text-sm text-neutral-200">
                                Email
                            </Label>
                            <Input
                                id={`${id}-email`}
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                className="h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor={`${id}-password`} className="text-sm text-neutral-200">
                                    Password
                                </Label>
                                <a href="/forgot-password" className="text-sm text-neutral-400 transition hover:text-white">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id={`${id}-password`}
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id={`${id}-remember`} className="border-white/20" />
                        <Label htmlFor={`${id}-remember`} className="font-normal text-neutral-400">
                            Remember me
                        </Label>
                    </div>

                    {errors.general && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                            {errors.general}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl bg-white font-semibold text-black transition-all hover:bg-neutral-200"
                    >
                        Login
                    </Button>
                </form>

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
                    <span className="text-xs text-neutral-500 uppercase">Or continue with</span>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => signInWith("oauth_google")}
                        className="h-12 rounded-xl border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                    >
                        Continue with Google
                    </Button>
                </div>

                <div className="text-center text-sm text-neutral-400">
                    Don&apos;t have an account?{" "}
                    <a href="/sign-up?dialog=true" className="font-medium text-white hover:underline">
                        Sign Up
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
}