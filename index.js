const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");


// controllers.searchLibrary({     topic: 'war' })

inquirer
  .prompt([
  {
    type: "input",
    message: "What books would you like to search for? ",
    name: "searchQuery"
  }
])
  .then(inquirerResponse => {
    let queries = {}
    if (!inquirerResponse.searchQuery) {
      throw new Error('Please Enter A Proper Response')
    }
    queries.topic = inquirerResponse.searchQuery
    controllers.searchLibrary(queries)

  })