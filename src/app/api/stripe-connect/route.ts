// Inside this route.ts we have a GET endpoint and this essentially handles 
// auth callbacks from stripe connect
import { prismaClient } from "@/lib/prismaClient";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const searchParams = request.nextUrl.searchParams
        const code = searchParams.get("code")
        const state = searchParams.get("state")

        if(!code || !state){
            console.error(" Missing required parameters:",{code,state});
            return NextResponse.redirect(
                new URL(
                    `/settings?success=false&message=Missing+required+parameters`,request.url
                )
            )

        }
        console.log("Processing Stripe connect callback:",{code,stateId:state})

        try {
            const response = await stripe.oauth.token({
                grant_type:"authorization_code",
                code,
            })

            if(!response.stripe_user_id){
                throw new Error("Failed to retrieve Stripe user ID")
            }

            await prismaClient.user.update({
                where:{
                    id:state,
                },
                data:{
                    stripeConnectId:response.stripe_user_id,
                }
            })
            
            console.log("Successfully connected Stripe Account:",{
                userId:state,
                stripeConnectId: response.stripe_user_id
            })
            return NextResponse.redirect(
                new URL(
                    `/settings?success=true&message=Stripe+account+connected+successfully`,
                    request.url
                )
            )
        } catch (stripeError) {
            console.error('Stripe connection error:', stripeError)
            return NextResponse.redirect(
                new URL(
                    `/settings?success=false&message=${encodeURIComponent(
                        (stripeError as Error).message
                    )}`,
                    request.url
                )
            )
        }
        
    } catch (error) {
        console.log("Unexpected error in Stripe callback handler:",error)
        return NextResponse.redirect(
            new URL(
                `/settings?success=false&message=An+unexpected+error+occurred`,
                request.url
            )
        )
    }
             
}