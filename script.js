const statusMsg = document.getElementById("status");
const notepad = document.getElementById("notepad");
let distractionCounter = document.getElementById("distraction-counter");
const resetDistPopup = document.getElementById("reset-dist-popup");
const resetAgree = document.getElementById("reset-agree");
const resetRefuse = document.getElementById("reset-refuse");
const wordCounter = document.getElementById("word-counter");

// Milestones for word count
function wordMilestone(id, title, desc, threshold){
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.threshold = threshold;
}

// Milestones for distractions...
function distMilestone(id, title, desc, threshold){
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.threshold = threshold;
}

const distMilestones = [
    new distMilestone("ds_10", "ADHD, Hydroxycut", "Wait, what were we doing?", 10)
    // milestone for 500 = mbappe special, for example nothing
    //also make one that has desc as hyper focused on everything but the actual goal
    
]

const wordMilestones = [
    new wordMilestone("ms_50", "Baby Steps", "50 words. Keep going", 50),
    new wordMilestone("ms_100", "Centurion", "Commander of a century of words", 100),
    new wordMilestone("ms_500", "Digital Samana", "Silenced the noise on the search for enlightenment?", 500),
    new wordMilestone("ms_1000", "Tribune", "You're moving up the ranks...", 1000),
    new wordMilestone("ms_5000", "Phokus Legate", "Am I bleeding? Never mind...", 5000),
    new wordMilestone("ms_10000", "Saiyan", "It's over 9000!", 10000),
    new wordMilestone("ms_50000", "Migraine", "Go get some water", 50000)
];
console.log(wordMilestones);

let distraktions = 0;

const savedText = localStorage.getItem("draft");
const savedDistraktions = parseInt(localStorage.getItem("distNo"));

if(savedText){
    notepad.value = savedText;
}

if(savedDistraktions){
    distraktions = savedDistraktions;
    distractionCounter.textContent = `Distraktions: ${distraktions}`;
}

let words = notepad.value.split(/[\s,.\/#!$%\^&\*;:{}=\-_`~()]+/);
let cleanWords = words.filter(word => word.length > 0);
let wordCount = cleanWords.length;
wordCounter.textContent = `Word Count: ${wordCount}`

notepad.addEventListener("input", 
   () => {
    localStorage.setItem("draft", notepad.value)
    words = notepad.value.split(/[\s,.\/#!$%\^&\*;:{}=\-_`~()]+/)
    cleanWords = words.filter(word => word.length > 0);
    wordCount = cleanWords.length;
    wordCounter.textContent = `Word Count: ${wordCount}`
   }
);

document.addEventListener("visibilitychange", () => {
    localStorage.setItem("distNo", distraktions);
})

document.addEventListener("visibilitychange", () => {
    if(document.hidden){
        distraktions++;
        distractionCounter.textContent = `Distraktions: ${distraktions}`;
        statusMsg.textContent = "Distrakted?";
        statusMsg.style.color = "ef4444";

        notepad.style.filter = "blur(8px)";
        notepad.style.transition = "filter 0.3s ease"
    }else{
        setTimeout(() => {
            statusMsg.textContent = "Welkome Back"
            notepad.style.filter = "none";
            notepad.style.transition = "filter 0.3s ease"
            setTimeout(() => {
                statusMsg.textContent = "Phokus Mode Activated"
            }, 2500)
        }, 4000)
    }
})

distractionCounter.addEventListener("click", () => {
    resetDistPopup.showModal();
})

resetAgree.addEventListener("click", () => {
    distraktions = 0;
    console.log(distraktions);
    localStorage.setItem("distNo", distraktions);
    distractionCounter.textContent = `Distraktions: ${distraktions}`;
    resetDistPopup.close()
})

resetRefuse.addEventListener("click", () => {
    resetDistPopup.close();
})