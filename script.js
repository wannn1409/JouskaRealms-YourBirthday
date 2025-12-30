/* ================= CONFETTI ================= */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfetti() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`
  };
}

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) confetti.push(createConfetti());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
      c.y += c.speed;
      if (c.y > canvas.height) c.y = -10;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================== SECTION CONTROL ================== */
let currentSection = 0;
const sections = [
  "formSection",
  "sec1",
  "sec2",
  "sec3",
  "sec4",
  "sec5"
];

function showSection(index) {
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = i === index ? "flex" : "none";
  });
  currentSection = index;
}

/* ================== START ================== */
document.addEventListener("DOMContentLoaded", () => {
  showSection(0);
});

/* ================== FORM SUBMIT ================== */
function showBirthday() {
  const name = document.getElementById("name").value.trim();
  const birth = document.getElementById("birth").value;
  const gender = document.getElementById("gender").value;

  if (!name || !birth || !gender) {
    alert("Lengkapi semua data dulu ya 😊");
    return;
  }

  document.getElementById("userName").innerText = name;

  showSection(1);

  setTimeout(() => showSection(2), 2000);
  setTimeout(() => startTyping(name), 2500);
  setTimeout(() => showSection(3), 9000);
  setTimeout(() => showSection(4), 12000);
}

/* ================== TYPING EFFECT ================== */
function startTyping(name) {
  const text = `Selamat ulang tahun ${name} 🎂✨  
Semoga di umur baru ini kamu selalu diberi kesehatan,  
kebahagiaan, dan semua impianmu pelan-pelan tercapai 🤍`;

  const el = document.getElementById("birthdayText");
  el.innerHTML = "";
  let i = 0;

  const typing = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(typing);
  }, 60);
}

/* ================== SECTION 4 → 5 + SAVE MESSAGE ================== */
function nextSection() {
  const name = document.getElementById("name").value.trim();
  const message = document.querySelector("#sec4 textarea").value.trim();

  if (!message) {
    alert("Harapannya jangan dikosongkan ya 😊");
    return;
  }

  const ADMIN_WA = "6282179795707"; 

  const waText = `
🎉 PESAN HARAPAN ULANG TAHUN 🎉

👤 Nama: ${name}

💌 Harapan:
${message}

🕒 Waktu: ${new Date().toLocaleString()}
  `;

  const waURL = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waText)}`;

  // buka WhatsApp
  window.open(waURL, "_blank");

  showSection(5);
  startConfetti();
}

/* ================= RESIZE ================= */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

