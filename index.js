const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");
const questions = require('./questions/questions');

const searchQuestions = questions.searchQuestions
const sortQuestions = questions.sortQuestions


/**
 * @param  {} searchQuestions
 */
inquirer
  .prompt(searchQuestions)
  .then(answers => {
    console.log(answers)

    /**
     * @summary Parse relevant answers into integers
     */
    answers['maxResults'] = parseInt(answers['maxResults']) 
    answers['startIndex'] = parseInt(answers['startIndex'])


    controllers.searchLibrary(answers)
  })
  .then(() => {
    /**
     * @param  {} sortQuestions
     */
    inquirer
      .prompt(sortQuestions)
      .then(answers => {
        if (answers['descending'] == 'Descending') {
          answers['descending'] = true
        } else {
          answers['descending'] = false
        }
        controllers.reorderCSV(answers)
      })

  })

  module.exports = {}
