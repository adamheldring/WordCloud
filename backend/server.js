const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 5000;


const countWords = (text) => {
  // Split text into clean list of words – without empties and special characters
  const words = []
  text.split(" ").forEach(word => {
    let cleanWord = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, "")
    if (cleanWord.length) words.push(cleanWord.toLowerCase())
  })

  // Count words in list.
  const wordCount = words.reduce((prev, nxt) => {
    const currentWord = prev.find(word => word.text === nxt)
    if (currentWord) {
      prev.find(word => word === currentWord).value++
    } else {
      prev.push({ text: nxt, value: 1 })
    }
    return prev;
  }, []);

  // Return Array of objects each representing a counted word
  return wordCount
}


app.use(cors())

app.get("/api/:searchTerm", (req, res) => {
  // Use search term and request a matching article from Wikipedia
  const searchTerm = req.params.searchTerm
  const wikiUrl = `https://sv.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${searchTerm}`
  axios
    .get(wikiUrl)
    .then(response => {
      let wikiText = null
      let wordCount = []
      pages = response.data.query.pages // Get page array from Wikipedia response
      pageId = Object.keys(pages)[0] // Grab id for first page in pages array

      // If page was delivered from wikipedia grab extract and count words
      if (pageId !== -1 && pages[pageId].extract) {
        wikiText = pages[pageId].extract
      }
      if (wikiText) {
        wordCount = countWords(wikiText)
      }
      res.json(wordCount) // Send all the counted words as a response.
    })
    .catch(err => { res.status(400).send(err) })
})

app.get("/", (req, res) => {
  res.send("WordCloud BE")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))