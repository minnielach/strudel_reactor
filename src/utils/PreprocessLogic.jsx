export function Preprocess ({ inputText, volume }) {

    const outputText = inputText.replace(/\{\$VOLUME\}/g, volume);

    return outputText;
}