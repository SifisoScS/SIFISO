const express = require('express')
const cors = require('cors')
const { spawn } = require('child_process')

const app = express()
app.use(cors())
app.use(express.json())

/**
 * DEVELOPMENT-ONLY Python execution.
 * DO NOT USE IN PRODUCTION.
 *
 * In production, replace with:
 * - Docker sandbox
 * - Resource limits
 * - Seccomp / AppArmor
 */

app.post('/run', (req, res) => {
  const { code } = req.body

  if (typeof code !== 'string' || code.trim() === '') {
    return res.json({
      output: null,
      error: 'No code provided.',
    })
  }

  // Choose python command (adjust if needed)
  const pythonCmd = 'python' // or 'python3'

  const process = spawn(pythonCmd, ['-u', '-c', code], {
    timeout: 2000, // 2 seconds max execution
  })

  let stdout = ''
  let stderr = ''
  let timedOut = false

  process.stdout.on('data', (data) => {
    stdout += data.toString()
  })

  process.stderr.on('data', (data) => {
    stderr += data.toString()
  })

  process.on('error', (err) => {
    return res.json({
      output: null,
      error: err.message,
    })
  })

  process.on('close', (code, signal) => {
    if (signal === 'SIGTERM') {
      timedOut = true
    }

    if (timedOut) {
      return res.json({
        output: null,
        error: 'Execution timed out.',
      })
    }

    if (stderr) {
      return res.json({
        output: null,
        error: stderr.trim(),
      })
    }

    return res.json({
      output: stdout,
      error: null,
    })
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('Backend running on port ' + PORT)
})
