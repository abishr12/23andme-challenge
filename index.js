const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");


// controllers.searchLibrary({     topic: 'war' })

inquirer
  .prompt([
  {
    type: "input",
    message: "Welcome to the Google Books API. \n What books would you like to search for today? ",
    name: "searchQuery"
  }
])
  .then(inquirerResponse => {
    let queries = {
      maxResults: 3
    }
    if (!inquirerResponse.searchQuery) {
      throw new Error('Please Enter A Proper Response')
    }
    queries.q= inquirerResponse.searchQuery
    controllers.searchLibrary(queries)

  }).then(() =>{
    controllers.reorderCSV()
  })