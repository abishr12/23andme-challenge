const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");
const questions = require('./questions/questions');

const searchQuestions = questions.searchQuestions
const sortQuestions = questions.sortQuestions
/**
 * @summary This is the main function used to connect to the Google API. 
 * Users will be asked questions related to their searching preferences
 * Their queries will be appended to a library.csv file 
 * If there is no existing library.csv file then one will be created
 */
const searchForBooks = () =>{
/**
 * @param  {} searchQuestions
 */
inquirer
  .prompt(searchQuestions)
  .then(answers => {
    

    /**
     * @summary Parse relevant answers into integers
     */
    answers.maxResults = parseInt(answers.maxResults)
    answers.startIndex = parseInt(answers.startIndex)

    controllers.searchGoogleBooks(answers)
  })
  .then(() => {
    /**
     * @param  {} sortQuestions
     */
    inquirer
      .prompt(sortQuestions)
      .then(answers => {
       
        if (answers.descending == 'Descending') {
          answers.descending = true
        } else {
          answers.descending = false
        }
        controllers.reorderCSV(answers)
      })

  })



}

searchForBooks()




module.exports = {searchForBooks}


