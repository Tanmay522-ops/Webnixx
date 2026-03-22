import crypto from "crypto";

// Verify payment signature from Razorpay
export const verifyRazorpaySignature = (
    orderId: string,
    paymentId: string,
    signature: string
): boolean => {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest("hex");

    return expectedSignature === signature;
};

// Convert rupees to paise
export const toPaise = (amount: number) => amount * 100;

// Convert paise to rupees
export const toRupees = (amount: number) => amount / 100;