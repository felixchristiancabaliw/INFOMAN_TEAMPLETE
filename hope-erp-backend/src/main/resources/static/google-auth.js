// "Continue with Google" for the Sign In and Register pages.
// The Google Client ID comes from the backend (GOOGLE_CLIENT_ID in .env).

let googleClient = null;
let googleNotConfigured = false;

function waitForGoogleScript() {
    return new Promise(function (resolve, reject) {
        let tries = 0;
        const timer = setInterval(function () {
            tries++;
            if (window.google && google.accounts && google.accounts.oauth2) {
                clearInterval(timer);
                resolve();
            } else if (tries > 50) {      // about 5 seconds
                clearInterval(timer);
                reject(new Error("Google script did not load"));
            }
        }, 100);
    });
}

// Call once when the page opens (so the popup can open instantly on click)
async function setupGoogle(showMessage) {
    try {
        const response = await fetch("/api/config");
        const config = await response.json();

        if (!config.googleClientId) {
            googleNotConfigured = true;
            return;
        }

        await waitForGoogleScript();

        googleClient = google.accounts.oauth2.initTokenClient({
            client_id: config.googleClientId,
            scope: "openid email profile",
            callback: async function (tokenResponse) {
                if (tokenResponse.error) {
                    showMessage("Google sign-in was cancelled.", false);
                    return;
                }

                try {
                    const response = await fetch("/api/google-login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ accessToken: tokenResponse.access_token })
                    });
                    const data = await response.json();

                    if (response.ok) {
                        window.location.href = "dashboard.html";
                    } else {
                        showMessage(data.message || "Google sign-in failed.", false);
                    }
                } catch (error) {
                    showMessage("Cannot reach the server. Is the backend running?", false);
                }
            }
        });
    } catch (error) {
        // stays null; the button explains the problem when clicked
    }
}

// Call this from the "Continue with Google" button
function startGoogleSignIn(showMessage) {
    if (googleNotConfigured) {
        showMessage("Google sign-in is not set up yet. Add GOOGLE_CLIENT_ID to the .env file.", false);
        return;
    }
    if (!googleClient) {
        showMessage("Google sign-in is not ready. Check your internet connection and try again.", false);
        return;
    }
    googleClient.requestAccessToken();
}
