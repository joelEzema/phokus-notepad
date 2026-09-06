// Get the page elements that the script will read from or update.
const statusMsg = document.getElementById("status");
const notepad = document.getElementById("notepad");
let distractionCounter = document.getElementById("distraction-counter");
const resetDistPopup = document.getElementById("reset-dist-popup");
const resetAgree = document.getElementById("reset-agree");
const resetRefuse = document.getElementById("reset-refuse");
const wordCounter = document.getElementById("word-counter");

// Define the information stored for each word-count milestone.
function wordMilestone(id, title, desc, threshold){
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.threshold = threshold;
}

// Define the information stored for each distraction milestone.
function distMilestone(id, title, desc, threshold){
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.threshold = threshold;
}

// Store the milestones that are based on leaving the notepad.
const distMilestones = [
    new distMilestone("ds_10", "ADHD, Hydroxycut", "Wait, what were we doing?", 10),
    new distMilestone("ds_20", "Lobotomy", "Error 2.2. Get back on track.", 20),
    new distMilestone("ds_50", "Honk If You're Lost", "Honk", 50),
    new distMilestone("ds_100", "Absolute Clown", "Scorsese doesn't hold a candle to you.", 100),
    new distMilestone("ds_200", "Misplaced Energy", "Hyper focused on everything but the actual goal", 200),
    new distMilestone("ds_500", "Look, a Butterfly!", "Is the other tab reaaly that interesting?", 500)  
]

// Store the milestones that are based on the number of words written.
const wordMilestones = [
    new wordMilestone("ms_50", "Half a Dollar", "Many men wish death upon your streak.", 50),
    new wordMilestone("ms_100", "Centurion", "Commander of a century of words", 100),
    new wordMilestone("ms_500", "Digital Samana", "Silenced the noise on the search for enlightenment?", 500),
    new wordMilestone("ms_1000", "Tribune", "You're moving up the ranks...", 1000),
    new wordMilestone("ms_5000", "Phokus Legate", "Am I bleeding? Never mind...", 5000),
    new wordMilestone("ms_10000", "Saiyan", "It's over 9000!", 10000),
    new wordMilestone("ms_50000", "Migraine", "Go get some water", 50000)
];
console.log(wordMilestones);

// Restore the IDs of achievements that have already been unlocked.
let unlockedAchievements = JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
[...distMilestones, ...wordMilestones].forEach(milestone => {
    milestone.unlocked = unlockedAchievements.includes(milestone.id);
});

// Track the total number of distractions during the current saved session.
let distraktions = 0;

// Restore the previously saved draft and distraction count from the browser.
const savedText = localStorage.getItem("draft");
const savedDistraktions = parseInt(localStorage.getItem("distNo"));

// Put the saved draft back into the notepad when one exists.
if(savedText){
    notepad.value = savedText;
}

// Put the saved distraction total back on the page when one exists.
if(savedDistraktions){
    distraktions = savedDistraktions;
    distractionCounter.textContent = `Distraktions: ${distraktions}`;
}

// Calculate the initial word count from the restored or empty notepad.
let words = notepad.value.split(/[\s,.\/#!$%\^&\*;:{}=_`~()]+|-(?=\s|$)/);
let cleanWords = words.filter(word => word.length > 0);
let wordCount = cleanWords.length;
let currentWordCount = 0;
let distractionlessWords = 0;
wordCounter.textContent = `Word Count: ${wordCount}`

// Save the draft and recalculate the word count whenever the notepad changes.
notepad.addEventListener("input", 
   () => {
    localStorage.setItem("draft", notepad.value)
    words = notepad.value.split(/[\s,.\/#!$%\^&\*;:{}=_`~()]+|-(?=\s|$)/)
    cleanWords = words.filter(word => word.length > 0);
    wordCount = cleanWords.length;
    wordCounter.textContent = `Word Count: ${wordCount}`

    // Compensate for backspacing affecting distractionless words this session.
    if((wordCount  - currentWordCount) < distractionlessWords){
        currentWordCount = wordCount - distractionlessWords;
    }

    // Calculate the words written since the most recent distraction.
    distractionlessWords = wordCount - currentWordCount;
    console.log(distractionlessWords);
    
    wordMilestones.forEach(wms => {
        if(wordCount >= wms.threshold && !wms.unlocked){
            console.log(`Achievement Unlocked: ${wms.title}-${wms.desc}`)
            wms.unlocked = true;
            unlockedAchievements.push(wms.id);
            localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements));

            let notification = document.createElement("div");
            notification.classList.add("unlocked-toast");
            notification.innerHTML = `
            <strong class="toast-title">${wms.title}</strong>
            <i class="toast-desc">${wms.desc}</i>`
            document.body.appendChild(notification);

            requestAnimationFrame(() => {
                notification.classList.add("show");
            });

            setTimeout(() => {
                notification.classList.remove("show");

                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 4000)
        }
    })
   }
);

// Save the distraction total whenever the page visibility changes.
document.addEventListener("visibilitychange", () => {
    localStorage.setItem("distNo", distraktions);
})

// Blur the notepad and update the status when the user leaves or returns.
document.addEventListener("visibilitychange", () => {
    // Leaving the page counts as a distraction and starts a fresh writing segment.
    if(document.hidden){
        currentWordCount = wordCount;
        distractionlessWords = 0;
        distraktions++;
        distractionCounter.textContent = `Distraktions: ${distraktions}`;
        statusMsg.textContent = "Distrakted?";
        statusMsg.style.color = "#ef4444";

        notepad.style.filter = "blur(8px)";
        notepad.style.transition = "filter 0.3s ease"
    }else{
        // Delay the welcome message and restore the notepad after the user returns.
        setTimeout(() => {
            statusMsg.textContent = "Welkome Back"
            statusMsg.style.color = "#ffc107";

            notepad.style.filter = "none";
            notepad.style.transition = "filter 0.3s ease"
            setTimeout(() => {
                statusMsg.textContent = "Phokus Mode"
                statusMsg.style.color = "#8a7d69";
            }, 2500)
        }, 4000)
    }
})

// Open the reset confirmation dialog when the distraction counter is clicked.
distractionCounter.addEventListener("click", () => {
    resetDistPopup.showModal();
})

// Reset the distraction count after the user confirms the dialog.
resetAgree.addEventListener("click", () => {
    distraktions = 0;
    console.log(distraktions);
    localStorage.setItem("distNo", distraktions);
    distractionCounter.textContent = `Distraktions: ${distraktions}`;
    resetDistPopup.close()
})

// Close the dialog without changing the count when the user cancels.
resetRefuse.addEventListener("click", () => {
    resetDistPopup.close();
})