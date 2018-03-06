const controllers = require("./controllers/controllers");
const inquirer = require("inquirer");
let queries = {
  maxResults: 3
}

// controllers.searchLibrary({ topic: 'war' })

inquirer
  .prompt([
  {
    type: "input",
    message: "Welcome to the Google Books API. What books would you like to search for today? ",
    name: "searchQuery"
  }
])
  .then(inquirerResponse => {

    if (!inquirerResponse.searchQuery) {
      throw new Error('Please Enter A Proper Response')
    }
    queries.q = inquirerResponse.searchQuery
    //controllers.searchLibrary(queries)

  })
  .then(() => {
    optionsMenu(queries)
  }).then(() =>{
    console.log('program has reached its end')
  })

function optionsMenu(listObj) {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add any parameters",
      choices: [
        'None', 'Maximize Results'
      ],
      name: "parameterChoice"
    }
  ]).then(res => {
    if (res.parameterChoice == 'Maximize Results') {
      maxResults(listObj)
    }
  })
}

function maxResults(listObj) {
  inquirer
    .prompt([
    {
      type: "input",
      message: "What is the number of results you would like? max 40",
      name: "maxResults"
    }
  ])
    .then(res => {
      listObj['maxResults'] = res.maxResults
      console.log(listObj)
    })
}
