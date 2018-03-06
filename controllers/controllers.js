const rp = require("request-promise");
const Json2csvParser = require('json2csv').Parser;

// const outputPath = './output.csv'
// const output = fs.createWriteStream(outputPath, {encoding: 'utf8'});

const fields = [
  'id',
  'etag',
  'selfLink',
  'volumeInfo.title',
  'volumeInfo.authors',
  'volumeInfo.publisher',
  'volumeInfo.publishedDate'
];

module.exports = {
  searchLibrary: (parameters) => {
    let maxResults = false
    const info = {
      uri: 'https://www.googleapis.com/books/v1/volumes?',
      qs: {
        q: `${parameters.topic}+ inauthor:${parameters.author || ''}`
      },
      json: true
    }
    if (maxResults) {
      info.qs.maxResults = maxResults
    }
    rp(info, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log("*".repeat(100));
      console.log(body)
      const json2csvParser = new Json2csvParser({fields});
      const csv = json2csvParser.parse(body.items);
      console.log("*".repeat(100));
      console.log(csv);
    }).catch(err => {
      throw new Error('Something Went Wrong')
    })

  }
}