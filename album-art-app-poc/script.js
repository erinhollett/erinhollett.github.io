// Referencing DOM elements from HTML
const video = document.getElementById('webcamFeed');
const templateCanvas = document.getElementById('albumCover');
const snapshotCanvas = document.getElementById('snapShot');
const croppedCanvas = document.getElementById('croppedSnapshot');
// Initializing 2D drawing commands for the canvas
const templateCtx = templateCanvas.getContext('2d');
const snapshotCtx = snapshotCanvas.getContext('2d');
const cropSnaphotCtx = croppedCanvas.getContext('2d');

const albumImage = new Image();
albumImage.src = './album1.jpg'
albumImage.onload = () => {
  templateCtx.drawImage(albumImage, 0, 0, templateCanvas.width, templateCanvas.height);
}

// Starts the webcam and shows it on the page
function startWebcam() {
  navigator.mediaDevices.getUserMedia({ video: true }) // Opens the webcam
    .then(stream => { // Perform once the webcam is actived/streaming:
      video.srcObject = stream; // Puts webcam feed in the video object
      video.style.display = "block"; // Makes webcam feed visable
    })
    .catch(err => {
      console.error("Error accessing webcam: ", err);
    });
}

// Turns off the webcam
function stopWebcam() {
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop()); // Shuts off the webcam
  }
  video.srcObject = null;
  video.style.display = 'none';
}

// Snaps a picture from the webcam feed
function takePicture() {
  snapshotCanvas.width = video.videoWidth;
  snapshotCanvas.height = video.videoHeight;

  snapshotCtx.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

  cropPicture();
}

function cropPicture() {
  // TODO fix later... make it work on vertical webcam / phone...
  // currently it only works when the width of the webcam is bigger than height...
  // migth just be able to do it by choosing min of height ond width!???!?!?
  const xMiddle = snapshotCanvas.width / 2;
  const yMiddle = snapshotCanvas.height / 2;

  const y = 0;
  const x = xMiddle - snapshotCanvas.height / 2;

  cropSnaphotCtx.drawImage(snapshotCanvas, x, y, snapshotCanvas.height, snapshotCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);
}

// Filling in John's Image
const johnX = 60;
const johnY = 68;
const johnWidth = 187;
const johnHeight = 187;

// Filling in Paul's Image
const paulX = 255;
const paulY = 68;
const paulWidth = 187;
const paulHeight = 187;

// Filling in Ringo's Image
const ringoX = 60;
const ringoY = 262;
const ringoWidth = 187;
const ringoHeight = 187;

// Filling in George's Image
const georgeX = 255;
const georgeY = 262;
const georgeWidth = 187;
const georgeHeight = 187;


function pasteToTemplate() {
  templateCtx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, johnX, johnY, johnWidth, johnHeight);

  templateCtx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, paulX, paulY, paulWidth, paulHeight);

  templateCtx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, ringoX, ringoY, ringoWidth, ringoHeight);

  templateCtx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, georgeX, georgeY, georgeWidth, georgeHeight);

}

// Button event listeners (launches the necessary functions)
document.getElementById('startWebcam').addEventListener('click', startWebcam);
document.getElementById('closeWebcam').addEventListener('click', stopWebcam);
document.getElementById('capturePhoto').addEventListener('click', takePicture);
document.getElementById('pasteCapture').addEventListener('click', pasteToTemplate);