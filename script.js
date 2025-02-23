document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Highlight the current section in the navigation bar
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
document.getElementById('mobile-number').addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9+]/g , ' ');  // Remove anything that's not a number or a plus sign
    });
    // Adding space between the country code and mobile number input (if not handled by CSS)
    document.getElementById('country-code').style.marginRight = "10px";  // Adds space between country code and input field
    
    // Apply dark mode on page load if user preference is stored
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
        toggleDarkMode();
    }

    // Add an event listener to the dark mode navigation link
    const darkModeNavLink = document.querySelector('#darkModeNavLink');
    if (darkModeNavLink) {
        darkModeNavLink.addEventListener('click', function (event) {
            event.preventDefault();
            toggleDarkMode();
        });
    }
});

var videoStream; // To store the video stream reference
var demoWindow;  // To store the reference to the demo window

function toggleSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('section');
    // Loop through each section and hide them all
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show only the clicked section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

function launchDemo() {
    // Attempt to access the camera and open the demo window
    alert('Attempting to access the camera. Please check for any browser prompts.');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            alert('Camera access granted. Opening demo window.');
            videoStream = stream;
            openDemoWindow();

            // Display the webcam feed in the video element
            const videoElement = demoWindow.document.getElementById('webcamVideo');
            videoElement.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
            alert('Error accessing camera. Check console for details.');
        });
}

function openDemoWindow() {
    // Open the demo window and set up its content
    demoWindow = window.open('', 'DemoWindow', 'width=700,height=600');
    demoWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Window</title>
        </head>
        <body>
            <h1>Welcome to the Demo Window</h1>
            <video id="webcamVideo" width="100%" height="auto" controls></video>
            <button class="cta-button" id="closeDemoBtn" style="display: block;">Close Demo</button>
            <script>
                function closeDemo() {
                    // Close the demo window and stop the video stream
                    if (window.opener && window.opener.closeDemo) {
                        window.opener.closeDemo();
                    }
                }

                document.getElementById("closeDemoBtn").addEventListener("click", closeDemo);
            </script>
        </body>
        </html>
    `);
}

function closeDemo() {
    // Close the demo window and stop the video stream
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    if (demoWindow) {
        demoWindow.close();
    }
}

function toggleScrollToTopButton() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// Add a function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem("darkMode", document.body.classList.contains('dark-mode')); // Save preference
}

var video = document.getElementById('demoVideo');
var muteButton = document.getElementById('muteButton');

function toggleMute() {
    if (video) {
        video.muted = !video.muted;
        muteButton.textContent = video.muted ? 'Unmute' : 'Mute';
    }
}

function tryObjectDetection() {
    console.log("Trying to load object detection...");
    const iframe = document.getElementById("objectDetectionFrame");
    
    if (iframe) {
        iframe.src = "http://localhost:8501/";  // Change this to your Flask app URL

        // Show the iframe and hide the "Try" button
        document.getElementById("objectDetectionContainer").style.display = "block";
        document.getElementById("tryObjectDetectionBtn").style.display = "none";
        document.getElementById("closeObjectDetectionBtn").style.display = "block";
    } else {
        console.error('Object Detection iframe not found!');
    }
}

function closeObjectDetection() {
    const iframe = document.getElementById("objectDetectionFrame");
    if (iframe) {
        iframe.src = ""; // Clear the iframe src to stop the service

        // Hide the iframe and show the "Try" button
        document.getElementById("objectDetectionContainer").style.display = "none";
        document.getElementById("closeObjectDetectionBtn").style.display = "none";
        document.getElementById("tryObjectDetectionBtn").style.display = "block";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}
