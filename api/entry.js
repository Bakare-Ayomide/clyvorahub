export default async (req, res) => {
  try {
    // Import the server handler - use dynamic import with correct path
    const { default: server } = await import('../dist/server/server.js')
    
    // Build URL
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    const url = `${protocol}://${host}${req.url}`
    
    // Get request body
    let body = undefined
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    }
    
    // Build headers
    const headers = new Headers()
    Object.entries(req.headers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v))
      } else if (value) {
        headers.append(key, String(value))
      }
    })
    
    // Create Fetch request and call handler
    const response = await server.fetch(new Request(url, {
      method: req.method,
      headers,
      body: body || undefined
    }))
    
    // Send response
    res.status(response.status)
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.send(await response.text())
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Error: ' + (error instanceof Error ? error.message : 'Unknown'))
  }
}
