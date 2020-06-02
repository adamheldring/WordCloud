import React, { useEffect, useState } from "react"
import Cloud from "../Cloud/Cloud"
import axios from "axios";

const TextTv = () => {
  const appIdentifier = "AHWordCloud"
  const [fromPage, setFromPage] = useState(100)
  const [toPage, setToPage] = useState(299)
  const url = `http://api.texttv.nu/api/get/${fromPage}-${toPage}?app=${appIdentifier}`
  const [pages, setPages] = useState([])
  const [isLoadingPages, setIsLoadingPages] = useState(true)
  const [selection, setSelection] = useState("news");
  const [wordCount, setWordCount] = useState([])
  const [numberOfWordsDisplayed, setNumberOfWordsDisplayed] = useState(10)

  // SUB-APP WITH COMPLETE FRONT-END SOLUTION
  // Front-end gets data directly from the TextTv.nu API

  // Fetch Text-Tv pages on first load and again if url (content) updates
  useEffect(() => {
    setIsLoadingPages(true)
    axios
      .get(url)
      .then(response => {
        setPages(response.data)
        setIsLoadingPages(false)
      })
      .catch(err => {
        console.log("Error fetching pages: ", err)
        setIsLoadingPages(false)
      })
  }, [url, setPages])

  // Grab a list of TextTv-pages, take all headlines, split into one big list of words, 
  // remove empties and special characters, count the words and use only the most popular.
  useEffect(() => {
    const getMostPopularWords = (countedList) => {
      const sortedList = countedList.sort((a, b) => b.value - a.value)
      return sortedList.slice(0, numberOfWordsDisplayed)
    }
    if (pages.length) {
      let words = []
      pages.forEach((page, pageIndex) => {
        if (pageIndex < toPage - 100) {
          if (page.title.length) {
            page.title.split(" ").forEach(word => {
              let cleanWord = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, "")
              if (cleanWord.length) words.push(cleanWord.toLowerCase())
            })
          }
        }
      })
      setWordCount(getMostPopularWords(getWordCount(words)))
    }
  }, [fromPage, numberOfWordsDisplayed, pages, toPage])

  // Turn a plain list of words into an array of objects representing counted words
  const getWordCount = (wordList) => {
    const wordCount = wordList.reduce((prev, nxt) => {
      const currentWord = prev.find(word => word.text === nxt)
      if (currentWord) {
        prev.find(word => word === currentWord).value++
      } else {
        prev.push({ text: nxt, value: 1 })
      }
      return prev;
    }, []);
    return wordCount
  }

  // Handle user input for content
  const handleSelectionChange = (selected) => {
    setSelection(selected)
    switch (selected) {
      case "news": {
        setFromPage(100)
        setToPage(299)
        break
      }
      case "sports": {
        setFromPage(300)
        setToPage(399)
        break
      }
      default: {
        setFromPage(100)
        setToPage(799)
      }
    }
  }

  // Handle user input for number of displayed words
  const handleNumberOfWordsChange = (amount) => {
    switch (amount) {
      case "many": {
        if (numberOfWordsDisplayed !== 40) {
          setNumberOfWordsDisplayed(40)
        }
        break
      }
      default: {
        if (numberOfWordsDisplayed !== 10) {
          setNumberOfWordsDisplayed(10)
        }
      }
    }
  }

  return (
    <div>
      <div className="subapp-info-wrapper">
        <div className="subapp-controls">
          <form style={{ marginRight: "40px" }} id="pageSelectionForm">
            <h4 className="subapp-filter-title">CONTENT</h4>
            <div>
              <input type="radio" id="news" name="pageSelection" value="news" checked={selection === "news"} onChange={e => handleSelectionChange(e.target.value)} />
              <label htmlFor="news">News</label>
            </div>
            <div>
              <input type="radio" id="sports" name="pageSelection" value="sports" checked={selection === "sports"} onChange={e => handleSelectionChange(e.target.value)} />
              <label htmlFor="sports">Sports</label>
            </div>
            <div>
              <input type="radio" id="everything" name="pageSelection" value="everything" checked={selection === "everything"} onChange={e => handleSelectionChange(e.target.value)} />
              <label htmlFor="everything">Everything</label>
            </div>
          </form>
          <form id={"numberOfWordsSelectionForm"}>
            <h4 className="subapp-filter-title">WORDS</h4>
            <div>
              <input type="radio" id="few" name="numberOfWords" value="few" checked={numberOfWordsDisplayed === 10} onChange={e => handleNumberOfWordsChange(e.target.value)} />
              <label htmlFor="few">Few</label>
            </div>
            <div>
              <input type="radio" id="many" name="numberOfWords" value="many" checked={numberOfWordsDisplayed === 40} onChange={e => handleNumberOfWordsChange(e.target.value)} />
              <label htmlFor="many">Many</label>
            </div>
          </form>
        </div>
        <div>
          <h2 className="subapp-title">SVT TEXT-TV</h2>
          <h3 className="subapp-active-filter">{wordCount.length ? `PAGES: ${fromPage} – ${toPage}` : ""}</h3>
        </div>
      </div>
      <Cloud words={wordCount} isLoading={isLoadingPages} />
    </div >
  )
}

export default TextTv;