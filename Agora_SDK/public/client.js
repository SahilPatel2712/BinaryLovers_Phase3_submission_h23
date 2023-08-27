const localVideoContainer = document.getElementById('local-video');
const remoteVideoContainer = document.getElementById('remote-video');

const channel = 'sahil';  // Replace with your desired channel name
const uid = Math.floor(Math.random() * 100000);  // Generate a random UID

// Fetch Agora token from Express server
fetch(`/join?channel=${channel}&uid=${uid}`)
  .then(response => response.json())
  .then(data => {
    const { appId, token } = data;

    // Initialize Agora client
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Join the channel
    agoraClient.init(appId, () => {
      agoraClient.join(token, channel, uid, uid => {
        // Create a local video stream
        const localStream = AgoraRTC.createStream({
          streamID: uid,
          audio: true,
          video: true,
          screen: false
        });

        // Initialize the local video stream and display it
        localStream.init(() => {
          localStream.play('local-video');
          agoraClient.publish(localStream);
        });

        // Subscribe to remote stream events
        agoraClient.on('stream-added', evt => {
          const remoteStream = evt.stream;
          agoraClient.subscribe(remoteStream);
        });

        agoraClient.on('stream-subscribed', evt => {
          const remoteStream = evt.stream;
          remoteStream.play('remote-video');
        });
      });
    });
  })
  .catch(error => {
    console.error('Error joining channel:', error);
  });
