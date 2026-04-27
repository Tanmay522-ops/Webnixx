import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);



const originalError = console.error
console.error = (...args) => {
    if (
        typeof args[0] === 'string' &&
        args[0].includes('daily-js') &&
        args[0].includes('no longer supported')
    ) {
        return // suppress this specific warning
    }
    originalError(...args)
}