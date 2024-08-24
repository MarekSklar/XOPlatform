const textIDs = Object.keys(config.text);
const language = config.selectedLanguage;
textIDs.forEach(textID => {
    const elements = document.querySelectorAll(`[text="${textID}"]`);
    
    elements.forEach(element => {
        element.innerHTML = config.text[textID][language]; 
    });
});