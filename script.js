const statusMsg = document.getElementById("status");
const notepad = document.getElementById("notepad");
const distractionCounter = document.getElementById("distraction-counter");

const savedText = localStorage.getItem("draft");

if(savedText){
    notepad.value = savedText;
}

notepad.addEventListener("input", 
   () => {
    localStorage.setItem("draft", notepad.value)
   }
);

document.addEventListener("visibilitychange", () => {
    if(document.hidden){
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