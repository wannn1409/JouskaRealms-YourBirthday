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

/* ================= SECTION CONTROL ================= */
let current = 0;

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function nextSection() {
  current++;
  showSection(`sec${current}`);
}

/* ================= FORM ================= */
function showBirthday() {
  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const gender = document.getElementById("gender").value;

  if (!name || !birth || !gender) {
    alert("Lengkapi dulu semua datanya yaa 😊");
    return;
  }

  document.getElementById("formSection").style.display = "none";

  current = 1;
  showSection("sec1");

  // isi nama user
  document.getElementById("userName").innerText = name;

  // auto pindah ke section 2 + typing
  setTimeout(() => {
    nextSection();
    typing();
  }, 2500);
}


/* ================= TYPING ================= */
const text = "Selamat ulang tahun 🎂 Semoga hari ini penuh senyum dan bahagia";
let i = 0;

function typing() {
  const el = document.getElementById("birthdayText");
  el.innerHTML = "";
  i = 0;

  function run() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(run, 80);
    } else {
      setTimeout(() => nextSection(), 1500);
    }
  }
  run();
}

/* ================= HARAPAN ================= */
let wish = "";
document.querySelector("textarea").addEventListener("input", e => {
  wish = e.target.value;
});

/* ================= RESIZE ================= */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

