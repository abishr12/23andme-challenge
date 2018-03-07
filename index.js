const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");
const questions = require('./questions/questions');

const searchQuestions = questions.searchQuestions
const sortQuestions = questions.sortQuestions

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

    controllers.searchLibrary(answers)
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
