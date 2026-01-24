// saves the settings to the browers local settings
export function saveSettings(settings, name) {
    // load saved list or empty list 
    const saved = JSON.parse(localStorage.getItem("strudelSettings")) || [] ;

    // adds the new named mix to the existing saved list 
    const updateList = saved.concat({name, settings});

    // update the saved list
    localStorage.setItem("strudelSettings", JSON.stringify(updateList));
    return updateList;
}
// loads the all saved mixes from local settings or empty list
export function loadSettings() {
    return JSON.parse(localStorage.getItem("strudelSettings")) || [];
}

// load the mix by name or null if not found
export function loadByName(name) {
    const saved = loadSettings();
    return saved.find(s => s.name === name) || null
}