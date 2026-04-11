export default async (req, res) => {
  try {
    // Import the server handler
    const { default: server } = await import('../dist/server/server.js')
    
    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    const url = `${protocol}://${host}${req.url}`
    
    // Build the body
    let body = undefined
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (typeof req.body === 'string') {
        body = req.body
      } else if (req.body) {
        body = JSON.stringify(req.body)
      } else {
        // Read from the request stream
        body = await new Promise((resolve) => {
          let data = ''
          req.on('data', chunk => {
            data += chunk
          })
          req.on('end', () => {
            resolve(data || undefined)
          })
        })
      }
    }
    
    // Create a Fetch API request
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value && typeof value === 'string') {
        headers.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v))
      }
    }
    
    const fetchRequest = new Request(url, {
      method: req.method,
      headers,
      body,
    })
    
    // Call the TanStack Start SSR handler
    const response = await server.fetch(fetchRequest)
    
    // Set response status
    res.status(response.status)
    
    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })
    
    // Send the body
    const responseBody = await response.text()
    res.send(responseBody)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
}
