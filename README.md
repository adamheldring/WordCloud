# WORD CLOUD :cloud:
### A small webapp that grabs a text from an API and creates a weighted visual display of the most common words in the shape of a word cloud.

:tv: The **TEXT-TV** subapp grabs a set of pages from the Texttv.nu API and counts the words in all the headlines in that series. The user can filter between different areas of interest and choose between displaying the top ten or the top forty most popular words. This subapp is a ***pure frontend solution*** where the frontend fetches data directly from the API and all data filtering is processed on the client side.

:pencil2: The **WIKIPEDIA** subapp uses a local ***backend in the form of a Node server***, which must be running simultaneously alongside the frontend app. The server deals with fetching data from the Wikipedia API and processes that data server-side into a pre-counted wordlist that is served to the frontend. The user can make live reactive searches in the Swedish Wikipedia archive using an input field. There is also an option to display either the top ten or the top forty most popular words from each article.


## Getting Started

### Preparation

- You will need to have [Node.js](https://nodejs.org/en/) installed on your computer.

- You will need some very basic knowledge of the command line and how to use something like the MacOS Terminal.
  Check out this [cheat sheet](https://github.com/0nn0/terminal-mac-cheatsheet) if you want to dust off your skills.

### Installing

- To get up and running, you will need a copy of this project on your local machine.

- Navigate to the directory of your local copy of this project using your terminal. It should look something like...

```
~/Documents/projects/WordCloud
```

- Before the first time you run your local environment you need to install the project and it's dependencies by running the following command two times – once from inside the backend folder and once from inside the frontend folder:

```
npm install
```


That's it, you're ready to get started!

## Running a local environment

- To fire up the project, start the server by running the start command below from inside the backend folder. And then start the frontend app by running the same command from within the frontend folder: 

```
npm start
```

Open your browser and navigate to:

[http://localhost:3000/](http://localhost:3000/)

## Project structure

### Backend
- Very straightforward with all the relevant code in the server.js file. 

### Frontend

- The top folder is mainly scaffolding while all the good stuff is located in the **_src_**-folder. 

#### Styling

- The frontend uses CSS-preprocessor SASS. Some basic global styling as well as a few classes shared by several components can be found in the top level style.scss file. The main part of the styling however, exists in local scss-modules located in the relevant component folders.

## Built With :hammer:

- [REACT](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [NODE](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 engine.
- [EXPRESS](https://expressjs.com/) - A minimalist web framwork for Node.js.

## Future next steps :rocket:
- Writing tests

- Improving the basic UI controls with a more pleasant presentation.

- Some markup could be more effectively shared between components, e.g the subapps could have a shared wrapper component instead of repeated code.

- Bugfix: the backend can't currently carry out a complete turnaround with search terms containing Swedish charachters åäö.

- If the backend should ever grow, it would make sense to extract independent functions from the server.js file into separate modules for readability and overview.

- The text-tv subapp is a little heavy on the logic side due to all data management sitting client-side, and could benefit from some functions being abstracted as external helper functions.

- There is room for evaluation of when data should be refetched as bits and pieces when the UI changes vs when bigger lists of data should instead be fetched only once and stored and filtered on the frontend.
