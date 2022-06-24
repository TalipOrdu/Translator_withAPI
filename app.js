
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");

const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row");

selectTag.forEach((tag, id) => {
    for(const country_code in countries) {
        
        let selected;
        if(id === 0 && country_code === "en-GB"){
            selected = "selected";
        }
        else if(id === 1 && country_code === "tr-TR"){
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option); //adding options tag inside select tag 

    
    }
});

exchangeIcon.addEventListener("click", () =>{

    let tempText = fromText.value,
    tempLang = selectTag[0].value;

    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    
    toText.value = tempText;
    selectTag[1].value = tempLang;
});



translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, //getting fromselect tag value
    translateTo = selectTag[1].value; //getting toSelect tag value

    //console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    
    //fetching api response and returning it with parsing into promise obj
    //and in another then method receiving that json obj
    fetch(apiUrl).then(response => response.json()).then(data => {
        
        console.log(data);
        toText.value = data.responseData.translatedText;
    });

});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        // console.log(target);
        if(target.classList.contains("fa-copy")) {

            //if clicked icon has from id, copy the fromTextarea value else copy the toTextArea value
            if(target.id === "from") {
                
                navigator.clipboard.writeText(fromText.value);

            }else{

                navigator.clipboard.writeText(toText.value);
            }
        }else{
            // console.log("Speech icon clicked");
            let utterance;
            if(target.id === "from") {
                
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value
            }else{

                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;  //setting utterance language to toSelect tag value
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    });
});
