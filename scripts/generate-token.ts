// scripts/generate-token.ts  (outside src/)
import { StreamClient } from '@stream-io/node-sdk'

const API_KEY = 'xpmacfuyd2eq'
const SECRET = 'h5er4m4hcdv47xwrrhr9cncz7cpg39t9xxz9jcwypvjeptc89fdynexvpqwdncr6'
const USER_ID = 'demo-user-eFCpRg8j'

const client = new StreamClient(API_KEY, SECRET)

const token = client.generateUserToken({ user_id: USER_ID })

console.log(token)