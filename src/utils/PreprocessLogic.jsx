export function Preprocess ({ inputText, volume , bassMute, bassReverb, bassPitch, arpMute, arpReverb, arpPitch, drumsMute, drumsReverb, drumsPitch, drums2Mute, drums2Reverb, drums2Pitch}) {
    
    const outputText = inputText.replace(/\{\$VOLUME\}/g, volume)
                                .replace(/\{\$BASS_MUTE\}/g, bassMute)
                                .replace(/\{\$BASS_REVERB\}/g, bassReverb)
                                .replace(/\{\$BASS_PITCH\}/g, bassPitch)
                                .replace(/\{\$ARP_MUTE\}/g, arpMute)
                                .replace(/\{\$ARP_REVERB\}/g, arpReverb)
                                .replace(/\{\$ARP_PITCH\}/g, arpPitch)
                                .replace(/\{\$DRUMS_MUTE\}/g, drumsMute)
                                .replace(/\{\$DRUMS_REVERB\}/g, drumsReverb)
                                .replace(/\{\$DRUMS_PITCH\}/g, drumsPitch)
                                .replace(/\{\$DRUMS2_MUTE\}/g, drums2Mute)
                                .replace(/\{\$DRUMS2_REVERB\}/g, drums2Reverb)
                                .replace(/\{\$DRUMS2_PITCH\}/g, drums2Pitch);

    return outputText;
}