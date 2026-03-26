import { useStripeElements } from "@/lib/stripe/stripe-client"
import {Elements} from "@stripe/react-stripe-js"

type Props={
    children:React.ReactNode
}

const StripeElements = ({children}:Props)=>{
    const {StripePromise} = useStripeElements()
    const promise = StripePromise()

    return promise && <Elements stripe={promise}>{children}</Elements>
}

export default StripeElements