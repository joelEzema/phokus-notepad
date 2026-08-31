const statusMsg = document.getElementById("status");
const notepad = document.getElementById("notepad");
let distractionCounter = document.getElementById("distraction-counter");
const resetDistPopup = document.getElementById("reset-dist-popup");
const resetAgree = document.getElementById("reset-agree");
const resetRefuse = document.getElementById("reset-refuse");

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

notepad.addEventListener("input", 
   () => {
    localStorage.setItem("draft", notepad.value)
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