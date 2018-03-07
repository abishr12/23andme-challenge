const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");

const Joi = require('joi');

// controllers.searchLibrary({     topic: 'war' })
function validateQuery(query) {
  return query !== "";
}
function validateNum(num) {
  var valid;
  Joi.validate(num, Joi.number().required().min(0).max(40), function (err, val) {
    if (err) {
      // console.log(err.message);
      valid = err.message;
    } else {
      valid = true;

    }

  });
  return valid
}
const searchQuestions = [
  {
    type: "input",

    message: "Welcome to the Google Books API. \n What books would you like to search for toda" +
        "y? ",
    name: "q",
    validate: validateQuery
  }, {
    type: "input",
    message: "Would you like to start at certain index? -- press enter key to skip",
    name: "startIndex",
    default: '0',
    validate: validateNum

  }, {
    type: "input",
    message: "How many results would you like to retrieve? (max 40)",
    name: "maxResults",
    default: '10',
    validate: validateNum
  }, {
    type: "list",
    message: "Ordered by?",
    choices: [
      'relevance', 'newest'
    ],
    name: "orderBy",
    default: 'relevance'
  }, {
    type: "list",
    message: "What kind of print are you looking for?",
    choices: [
      'all', 'books', 'magazines'
    ],
    name: "printType",
    default: 'all'
  }
]

const sortQuestions = [
  {
    type: 'list',
    message: 'How would you like your csv sorted?',
    choices: [
      'Title',
      'Author(s)',
      'Publisher',
      'Published Date',
      'Page Count',
      'Average Rating',
      'Ratings Count'
    ],
    name: 'categorySort'
  }, {
    type: 'list',
    message: 'Ascending or Descending?',
    choices: [
      'Descending', 'Ascending'
    ],
    name: 'descending'
  }
]

inquirer
  .prompt(searchQuestions)
  .then(answers => {
    console.log(answers)

    answers['maxResults'] = parseInt(answers['maxResults'])

    answers['startIndex'] = parseInt(answers['startIndex'])

    // console.log(answers)

    controllers.searchLibrary(answers)
  })
  .then(() => {
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

