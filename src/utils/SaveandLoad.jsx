export function saveSettings(settings) {
    localStorage.setItem("strudelSettings", JSON.stringify(settings));
}

export function loadSettings() {
    const saved = localStorage.getItem("strudelSettings");
    if (!saved) {
        return null
    };

    return JSON.parse(saved);
}