export function saveSettings(settings) {
    // saves the settings to the browers local settings
    localStorage.setItem("strudelSettings", JSON.stringify(settings));
}
// loads the saved settings from local settings 
export function loadSettings() {
    const saved = localStorage.getItem("strudelSettings");
    if (!saved) {
        return null // return null if no saved setting is found
    };

    return JSON.parse(saved);
}