// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Elements
const loginSection = document.getElementById("loginSection");
const busSection = document.getElementById("busSection");

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            loginSection.style.display = "none";
            busSection.style.display = "block";
            initMap();  // Initialize map on successful login
        })
        .catch(error => alert(error.message));
});

// Google Maps Initialization
let map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.7041, lng: 77.1025 },
        zoom: 10
    });
    marker = new google.maps.Marker({
        map: map,
        position: { lat: 28.7041, lng: 77.1025 }
    });
}

// Bus Tracking
function trackBus() {
    const busNo = document.getElementById("busNumber").value;
    fetch(`/bus-location/${busNo}`)
        .then(response => response.json())
        .then(data => {
            const position = { lat: data.latitude, lng: data.longitude };
            marker.setPosition(position);
            map.setCenter(position);
        })
        .catch(error => alert("Bus not found"));
}
