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