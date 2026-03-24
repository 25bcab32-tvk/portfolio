document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // ✅ Basic validation
  if (!name || !email || !message) {
    alert("⚠️ Please fill all fields");
    return;
  }

  try {
    const res = await fetch("https://portfolio-backend-dirf.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    // ✅ Handle response safely
    const data = await res.json();

    if (res.ok) {
      alert("✅ " + data.message);

      // ✅ Clear form after success
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ " + data.message);
    }

  } catch (err) {
    console.error(err);
    alert("❌ Server error. Try again later.");
  }
});