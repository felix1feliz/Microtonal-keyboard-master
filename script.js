let start_button = document.getElementById("start");
start_button.addEventListener("click", async e => {
    e.preventDefault();
    start_button.hidden = true;

    // Audio Context
    const ACTX = new AudioContext();

    const KFILE = await fetch("./tunings/18TET.json");
    const KEYS = await KFILE.json();

    document.addEventListener("keydown", e => {
        if(KEYS[e.key] === undefined) return;
        if(KEYS[e.key].osc !== null) return;
        KEYS[e.key].osc = ACTX.createOscillator();
        KEYS[e.key].osc.type = "square";
        KEYS[e.key].osc.frequency.setValueAtTime(KEYS[e.key].freq, ACTX.currentTime);
        KEYS[e.key].osc.connect(ACTX.destination);
        KEYS[e.key].osc.start();
    });

    document.addEventListener("keyup", e => {
        if(KEYS[e.key] === undefined) return;
        if(KEYS[e.key].osc === null) return;
        KEYS[e.key].osc.stop();
        KEYS[e.key].osc.disconnect(ACTX.destination);
        KEYS[e.key].osc = null;
    });
});
