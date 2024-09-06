function changeLanguage() {
    const textIDs = Object.keys(config.elements);
    const language = config.selectedLanguage;
    textIDs.forEach(textID => {
        const elements = document.querySelectorAll(`[text="${textID}"]`);
        
        elements.forEach(element => {
            if (config.elements[textID]["type"] === "text") element.innerHTML = config.elements[textID][language];
            else if (config.elements[textID]["type"] === "src") element.src = config.elements[textID][language];
        });
    });
}