import { VercelRequest, VercelResponse } from '@vercel/node'
import server from '../dist/server/server.js'

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    
    // Convert Vercel request to Fetch API Request
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    })
    
    // Call the TanStack Start SSR handler
    const response = await server.fetch(fetchRequest)
    
    // Convert Fetch Response to Vercel response
    res.status(response.status)
    
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })
    
    const body = await response.text()
    res.send(body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}
