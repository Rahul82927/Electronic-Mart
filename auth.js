document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const signInUpLink = document.querySelector(".sing_in_up");

    console.log("Sign-up form detected:", signUpForm);
    console.log("Sign-in form detected:", signInForm);
    console.log("Forgot password form detected:", forgotPasswordForm);

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);
    }

    function updateUserDisplay() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log("Logged in user:", loggedInUser);
        if (loggedInUser && signInUpLink) {
            signInUpLink.innerHTML = `<span style="font-size: 16px">Welcome, ${loggedInUser.name} | <a href="#" id="logout">Logout</a></span>`;
            document.getElementById("logout").addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                window.location.reload();
            });
        }
    }

    if (signUpForm) {
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Sign-up form submitted");
            const name = document.getElementById("signUpName").value;
            const email = document.getElementById("signUpEmail").value;
            const password = document.getElementById("signUpPassword").value;
            
            if (!validateEmail(email)) {
                console.log("Invalid email format");
                document.getElementById("signUpError").innerText = "Invalid email format!";
                return;
            }
            if (!validatePassword(password)) {
                console.log("Invalid password format");
                document.getElementById("signUpError").innerText = "Password must be at least 8 characters and include a special character!";
                return;
            }
            if (localStorage.getItem(email)) {
                console.log("User already exists");
                document.getElementById("signUpError").innerText = "User already exists!";
            } else {
                localStorage.setItem(email, JSON.stringify({ name, password }));
                console.log("User registered successfully");
                alert("Sign-up successful! Please sign in.");
                window.location.href = "sign-in.html";
            }
        });
    }

    if (signInForm) {
        signInForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Sign-in form submitted");
            const email = document.getElementById("signInEmail").value;
            const password = document.getElementById("signInPassword").value;
            
            const user = JSON.parse(localStorage.getItem(email));
            console.log("Retrieved user:", user);
            if (user && user.password === password) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                console.log("Sign-in successful");
                alert("Sign-in successful! Redirecting to homepage.");
                window.location.href = "index.html";
            } else {
                console.log("Invalid credentials");
                document.getElementById("signInError").innerText = "Invalid email or password!";
            }
        });
    }

    updateUserDisplay();
});

window.onload = () => {
    updateUserDisplay();
};
