const inputEl = document.getElementById("input")
const infoTextEl = document.getElementById("info-text")
const meaningContainerEl = document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")

async function fetchAPI(word) {
    try {
        meaningContainerEl.style.display = "none"
        infoTextEl.style.display = "block"
        infoTextEl.innerText = `Searching the meaning of "${word}"`

        const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(URL).then((res) => res.json())

        infoTextEl.style.display = "none"
        meaningContainerEl.style.display = "block"
        if (result.title) {
            titleEl.innerText = word
            meaningEl.innerText = result.message
            audioEl.style.display = "none"
        } else {
            audioEl.style.display = "inline-flex"
            titleEl.innerText = result[0].word
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition
            audioEl.src = result[0].phonetics[0].audio
        }
        console.log(result)
    } catch (error) {
        infoTextEl.innerText = "an error accured, try again later"
        console.log(error)
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value)
    }
})