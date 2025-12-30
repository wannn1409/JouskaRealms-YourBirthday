/* ================= INIT ================= */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const sections = ["formSection", "sec1", "sec2", "sec3", "sec4", "sec5"];
let current = 0;
let canNext = false;
let userName = "";

/* ================= CONFETTI ================= */
let confetti = [];

function startConfetti() {
  confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 6 + 4,
    v: Math.random() * 3 + 2,
    c: `hsl(${Math.random() * 360},100%,60%)`
  }));

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.s, p.s);
      p.y += p.v;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(animate);
  })();
}

/* ================= SECTION CONTROL ================= */
function showSection(i) {
  sections.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el) el.style.display = idx === i ? "flex" : "none";
  });

  current = i;
  canNext = false;
  toggleHint(false);

  setTimeout(() => {
    canNext = true;
    toggleHint(true);
  }, 5000);

  if (i === 1) typeText("userName", userName, 120, true);
  if (i === 2) typeText("birthdayText", birthdayMessage(), 50);
  if (i === 5) startConfetti();
}

/* ================= TAP HINT ================= */
function toggleHint(show) {
  document.querySelectorAll("#tapHint").forEach(h => {
    h.style.opacity = show ? "1" : "0";
  });
}

/* ================= TYPING EFFECT ================= */
function typeText(id, text, speed, isName = false) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  if (isName) {
    el.style.color = "#ff6fae";
    el.style.fontFamily = "Pacifico, cursive";
  }

  let i = 0;
  const typing = setInterval(() => {
    el.innerHTML += text.charAt(i++);
    if (i >= text.length) clearInterval(typing);
  }, speed);
}

function birthdayMessage() {
  return `Selamat ulang tahun ${userName} 🎂✨  
Semoga di umur baru ini kamu selalu diberi kesehatan,  
kebahagiaan, dan semua impianmu pelan-pelan tercapai 🤍`;
}

/* ================= FORM ================= */
function showBirthday() {
  const name = document.getElementById("name").value.trim();
  const birth = document.getElementById("birth").value;
  const gender = document.getElementById("gender").value;

  if (!name || !birth || !gender) {
    alert("Lengkapi semua data dulu ya 😊");
    return;
  }

  userName = name;

  const music = document.getElementById("music");
  music.volume = 0.6;
  music.play().catch(() => {});

  showSection(1);
}

/* ================= SECTION 4 ================= */
function nextSection() {
  const msg = document.querySelector("#sec4 textarea").value.trim();
  if (!msg) return alert("Harapannya jangan dikosongkan ya 😊");

  const wa = `https://wa.me/6282179795707?text=${encodeURIComponent(
    `🎉 HARAPAN ULANG TAHUN\n\n👤 ${userName}\n\n💌 ${msg}`
  )}`;

  window.open(wa, "_blank");
  showSection(5);
}

/* ================= TAP CONTROL ================= */
document.addEventListener("click", () => {
  if (canNext && current < sections.length - 1) {
    showSection(current + 1);
  }
});

/* ================= START ================= */
document.addEventListener("DOMContentLoaded", () => showSection(0));

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
