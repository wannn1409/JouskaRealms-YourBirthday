/* ================= INIT ================= */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const sections = [
  "formSection", // 0
  "sec1",        // 1 (tanpa tap)
  "sec2",        // 2 (typing + tap)
  "sec3",        // 3 (tap)
  "sec4",        // 4 (tanpa tap)
  "sec5"         // 5 (confetti)
];

const tapAllowedSections = ["sec2", "sec3"];
let currentIndex = 0;
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
function showSection(index) {
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.style.display = i === index ? "flex" : "none";
  });

  currentIndex = index;
  canNext = false;
  updateTapHint();

  // efek per section
  if (index === 1) {
  typeText("userName", userName, 120, true);


  if (index === 2) {
    typeText("birthdayText", birthdayMessage(), 50);
  }

  if (index === 5) {
    startConfetti();
  }

  // tap aktif hanya untuk section tertentu
  if (tapAllowedSections.includes(sections[index])) {
    setTimeout(() => {
      canNext = true;
      updateTapHint();
    }, 5000);
  }
}

/* ================= TAP HINT ================= */
function updateTapHint() {
  const hint = document.getElementById("tapHint");
  const currentId = sections[currentIndex];

  hint.style.opacity =
    tapAllowedSections.includes(currentId) && canNext ? "1" : "0";
}

/* ================= TYPING ================= */
function typeText(id, text, speed, isName = false) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  if (isName) {
    el.style.color = "#7B7CFF";
    el.style.fontFamily = "Pacifico, cursive";
  }

  let i = 0;
  const typing = setInterval(() => {
    el.innerHTML += text.charAt(i++);
    if (i >= text.length) clearInterval(typing);
  }, speed);
}

function birthdayMessage() {
  return `Haii ${userName} 🥳🎂✨  

Selamat ulang tahun yaa 🤍  
Semoga kamu selalu sehat, panjang umur,  
rezekinya lancar, dan semua hal baik  
pelan-pelan datang ke hidup kamu.  

Semoga pertemanan kita juga  
terus terjalin dengan baik.  
Hari ini milik kamu —  
nikmati dan berbahagialah 🤍✨`;
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

/* ================= TAP ================= */
document.addEventListener("click", (e) => {
  if (["TEXTAREA", "INPUT", "BUTTON"].includes(e.target.tagName)) return;
  if (!canNext) return;

  const currentId = sections[currentIndex];
  if (!tapAllowedSections.includes(currentId)) return;

  if (currentIndex < sections.length - 1) {
    showSection(currentIndex + 1);
  }
});


/* ================= START ================= */
document.addEventListener("DOMContentLoaded", () => showSection(0));

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
