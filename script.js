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
        ctx.clearRect(0,0,canvas.width,canvas.height);
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

function showBirthday() {
    const name = document.getElementById("name").value;
    const birth = document.getElementById("birth").value;
    const gender = document.getElementById("gender").value;

    if (!name || !birth || !gender) {
        alert("lengkapi dulu semua datanya yaa");
        return;
    }

    document.getElementById("formSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    document.getElementById("resultName").innerText = name;
    document.getElementById("resultText").innerText =
        gender === "Laki-laki"
        ? "Semoga kamu selalu bahagia dan bersinar💪✨"
        : "Semoga kamu selalu bahagia dan bersinar 🌸✨";

    document.getElementById("music").play();
    startConfetti();
}

function reset() {
    location.reload();
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
