const container = document.getElementById("achievements-container");
const unlockedAchievements = JSON.parse(
    localStorage.getItem("unlockedAchievements") || "[]"
)

const allAchievements = [...wordMilestones, ...distMilestones];
const achievementCount = document.querySelector(".achievement-count");

achievementCount.textContent = `${unlockedAchievements.length} unlocked`;

const sortedAchievements = [...allAchievements].sort((first, second) => {
    const firstIsUnlocked = unlockedAchievements.includes(first.id);
    const secondIsUnlocked = unlockedAchievements.includes(second.id);

    return Number(secondIsUnlocked) - Number(firstIsUnlocked);
});

sortedAchievements.forEach(ach => {
    const card = document.createElement("article");
    const isUnlocked = unlockedAchievements.includes(ach.id);

    card.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;
    card.setAttribute("aria-label", `${ach.title}: ${isUnlocked ? "Unlocked" : "Locked"}`);

    const isWordMilestone = ach.id.startsWith("ms_");
    const requirement = isUnlocked
        ? `<p class="achievement-requirement">Requirement: ${ach.threshold} ${isWordMilestone ? "words" : "distractions"}</p>`
        : "";

    card.innerHTML = `
        <div class="achievement-lock" aria-hidden="true">${isUnlocked ? "" : "&#128274;"}</div>
        <div class="achievement-details">
            <p class="achievement-type">${isWordMilestone ? "Word milestone" : "Clown milestone"}</p>
            <h3>${ach.title}</h3>
            <p class="achievement-description">${ach.desc}</p>
            ${requirement}
        </div>
        <span class="achievement-status">${isUnlocked ? "Unlocked" : "Locked"}</span>`;

    container.appendChild(card)
})