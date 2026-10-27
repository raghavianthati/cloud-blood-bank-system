// ===============================
// FIREBASE CONFIGURATION
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyDk5YeFCkC1ONw--LxucA6A7rM7qHE1hww",
    authDomain: "cloud-blood-bank-d3600.firebaseapp.com",
    projectId: "cloud-blood-bank-d3600",
    storageBucket: "cloud-blood-bank-d3600.firebasestorage.app",
    messagingSenderId: "1014131401911",
    appId: "1:1014131401911:web:97bf926b5fe2e307499932",
    measurementId: "G-QHTQJ6L934"
};


// ===============================
// INITIALIZE FIREBASE
// ===============================

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)

            .then(function() {

                alert("Login successful!");

                window.location.href = "dashboard.html";

            })

            .catch(function(error) {

                alert("Login failed: " + error.message);

            });

    });

}
// ===============================
// FIRESTORE - DASHBOARD
// ===============================

const db = firebase.firestore();

const totalBloodUnits = document.getElementById("totalBloodUnits");

if (totalBloodUnits) {

    db.collection("bloodInventory").get()
        .then(function(snapshot) {

            let totalUnits = 0;

            snapshot.forEach(function(doc) {

                const data = doc.data();

                totalUnits += Number(data.unitsAvailable) || 0;

            });

            totalBloodUnits.textContent = totalUnits;

        })
        .catch(function(error) {

            console.error("Error reading blood inventory:", error);

        });
}