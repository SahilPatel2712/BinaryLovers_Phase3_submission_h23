const express = require('express');
const AgoraRTC = require('agora-rtc-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Set up Agora credentials
const APP_ID = 'b8ae5ce338264910947522b6fda3c711';
const APP_CERTIFICATE = '5b4cd0b0187e4356b5ada00ba1a7e68e';

// Create Agora client
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

// Handle client join request
app.get('/join', (req, res) => {
  const { channel, uid } = req.query;

  // Generate Agora token
  const token = AgoraRTC.generateToken(APP_ID, APP_CERTIFICATE, channel, uid);

  res.json({ appId: APP_ID, channel, token });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
