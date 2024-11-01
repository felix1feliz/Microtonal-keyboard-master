let start_button = document.getElementById("start");
start_button.addEventListener("click", async e => {
    e.preventDefault();
    start_button.hidden = true;

    // Audio Context
    const ACTX = new AudioContext();

    const KFILE = await fetch("./tunings/BST.json");
    const KEYS = await KFILE.json();

    document.addEventListener("keydown", e => {
        let key = e.key.toLowerCase();
        if(KEYS[key] === undefined) return;
        if(KEYS[key].osc !== null) return;
        KEYS[key].osc = ACTX.createOscillator();
        KEYS[key].osc.type = "square";
        KEYS[key].osc.frequency.setValueAtTime(KEYS[key].freq * (e.shiftKey ? 2 : 1), ACTX.currentTime);
        KEYS[key].osc.connect(ACTX.destination);
        KEYS[key].osc.start();
    });

    document.addEventListener("keyup", e => {
        let key = e.key.toLowerCase();
        if(KEYS[key] === undefined) return;
        if(KEYS[key].osc === null) return;
        KEYS[key].osc.stop();
        KEYS[key].osc.disconnect(ACTX.destination);
        KEYS[key].osc = null;
    });
});
