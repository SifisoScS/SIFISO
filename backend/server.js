const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// NOTE:
// Python code execution MUST be sandboxed in production.
// Use Docker, resource limits, and strict validation.

app.post('/run', (req, res) => {
  res.json({ output: 'Execution sandbox not implemented yet.' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Backend running on port ' + PORT);
});
