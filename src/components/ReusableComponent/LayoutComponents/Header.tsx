"use client"
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { ArrowLeft, CloudLightningIcon} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'
import PurpleIcon from '../PurpleIcon'
import LightningIcon from '@/icons/LightningIcon'
import CreateWebinarButton from '../CreateWebinarButton'
import Stripe from 'stripe'
import StripeElements from '../Stripe/Element'
import SubscriptionModal from '../SubscriptionModal'
import { Assistant } from '@vapi-ai/server-sdk/api'



type Props = {
    user: User
    stripeProducts:Stripe.Product[] | []
    assistants: Assistant[] | []
 
}

const Header = ({user,stripeProducts,assistants}:Props) => {
    const pathname = usePathname()
    const router = useRouter()

  return (
      <div className="w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
          {pathname.includes('pipeline') ? (
              <Button
                  className="bg-primary/10 border border-border rounded-xl"
                  variant={'outline'}
                  onClick={() => router.push('/webinars')}
              >
                  <ArrowLeft /> Back to Webinars
              </Button>
          ) : (
              <div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize">
                  {pathname.split('/')[1]}
              </div>
          )}
          {/* TODO Build Strip subscription and create webinar button */}
          <div className='flex gap-6 items-center justify-center'>
              <PurpleIcon>
                  <LightningIcon/>
              </PurpleIcon>
              {/* TODO Build Strip subscription and create webinar button */}
              {/* {user.subscription ? "":""} */}

              {/* if user has a subscription then only we give the ability
               to create a webinar */}
               {/* we dont have stripe for now so for now only we go to build button simply  */}

              {user.subscription ? (
                  <CreateWebinarButton 
                  stripeProducts={stripeProducts} 
                  assistants={assistants}
                  />
              ) : (
                  <StripeElements>
                      <SubscriptionModal user={user} />
                  </StripeElements>
              )}

          </div>
      </div>
  )
}

export default Header
