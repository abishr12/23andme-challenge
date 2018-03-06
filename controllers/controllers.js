const rp = require("request-promise");
const Json2csvParser = require('json2csv').Parser;
const fields = ['car', 'price', 'color'];

module.exports = {
  searchLibrary: (parameters) => {
    const info = {
      uri: 'https://www.googleapis.com/books/v1/volumes?',
      qs: {
        q: `${parameters.topic}+ inauthor:${parameters.author || ''}`
      },
      json: true
    }
    rp(info, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log("*".repeat(100));
      console.log(body)
    })
      .catch(err => {
        throw new Error('Something Went Wrong')
      })

  }
}