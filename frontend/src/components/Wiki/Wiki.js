import React, { useEffect, useState } from "react"
import Cloud from "../Cloud/Cloud"
import axios from "axios";
import { useDebounce } from "use-debounce"

const Wiki = () => {
  const [numberOfWordsDisplayed, setNumberOfWordsDisplayed] = useState(10)
  const [wordCount, setWordCount] = useState([])
  const [isLoadingArticle, setIsLoadingArticle] = useState(true)
  const [searchTerm, setSearchTerm] = useState("undertext")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const url = "http://localhost:5000/api/"

  // SUB-APP WITH CUSTOM BACKEND SOLUTION
  // Gets data from local Node server (that must be running) on port 5000 – 
  // which in turn fetches and prepares Wikipedia data.

  // Fetch wikipedia article that matches SerachTerm – once on first load and again when searchTerm updates
  useEffect(() => {
    const getMostPopularWords = (countedList) => {
      const sortedList = countedList.sort((a, b) => b.value - a.value)
      return sortedList.slice(0, numberOfWordsDisplayed)
    }
    setIsLoadingArticle(true)
    axios
      .get(url + debouncedSearchTerm)
      .then(response => {
        setWordCount(getMostPopularWords(response.data))
        setIsLoadingArticle(false)
      })
      .catch(err => {
        setWordCount([])
        console.log("Error fetching article: ", err)
        setIsLoadingArticle(false)
      })
  }, [debouncedSearchTerm, numberOfWordsDisplayed])


  // Handle user input for content
  const handleSearchWordChange = (e) => {
    setSearchTerm(e.target.value)
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
          <form style={{ marginRight: "20px" }} id="searchWordfrom" onSubmit={e => e.preventDefault()}>
            <h4 className="subapp-filter-title">SEARCH WORD</h4>
            <div>
              <input type="input" placeholder="Search..." value={searchTerm} onChange={e => handleSearchWordChange(e)} />
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
          <h2 className="subapp-title">WIKIPEDIA</h2>
          <h3 className="subapp-active-filter">{wordCount.length ? debouncedSearchTerm.toUpperCase() : ""}</h3>
        </div>
      </div>
      <Cloud words={wordCount} isLoading={isLoadingArticle} req={debouncedSearchTerm} />
    </div >
  )
}

export default Wiki;