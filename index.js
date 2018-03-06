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
    if (!inquirerResponse.searchQuery) {
      throw new Error('Please Enter A Proper Response')
    } 
      controllers.searchLibrary({topic: inquirerResponse.searchQuery})
    

  })