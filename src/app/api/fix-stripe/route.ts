// app/api/fix-stripe/route.ts
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: 'acct_1TQ22YSFPb6yhVju',
            refresh_url: 'http://localhost:3000',
            return_url: 'http://localhost:3000',
            type: 'account_onboarding',
        })

        return NextResponse.json({ url: accountLink.url })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}