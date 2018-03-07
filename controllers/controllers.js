const fs = require('fs');
const rp = require("request-promise");
const Json2csvParser = require('json2csv').Parser;
const newLine = "\r\n";
const reorder = require('csv-reorder');

// const outputPath = './output.csv' const output =
// fs.createWriteStream(outputPath, {encoding: 'utf8'});

const fields = [
  {
    label: 'Identification',
    value: 'id'
  }, {
    label: 'E-Tag',
    value: 'etag'
  }, {
    label: 'Link',
    value: 'selfLink'
  }, {
    label: 'Title',
    value: 'volumeInfo.title'
  }, {
    label: 'Author(s)',
    value: 'volumeInfo.authors'
  }, {
    label: 'Publisher',
    value: 'volumeInfo.publisher'
  }, {
    label: 'Published Date',
    value: 'volumeInfo.publishedDate'
  }, {
    label: 'Page Count',
    value: 'volumeInfo.pageCount'
  }, {
    label: 'Average Rating',
    value: 'volumeInfo.averageRating'
  }, {
    label: 'Ratings Count',
    value: 'volumeInfo.ratingsCount'
  }
];

module.exports = {
  searchLibrary: (parameters) => {

    const info = {
      uri: 'https://www.googleapis.com/books/v1/volumes?',
      qs: {
        q: `${parameters.q}`
      },
      json: true
    }

    for (let key in parameters) {
      if (key != 'q') {
        info.qs[key] = parameters[key]
      }
    }
    console.log(info)

    rp(info, function (error, response, body) {

      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the
      // response status code if a response was received console.log("*".repeat(100));

      let books = body.items

      // console.log("*".repeat(100)); console.log(books)

      fs.stat('library.csv', function (err, stat) {

        if (err == null) {
          // console.log('File exists')
          const json2csvParser = new Json2csvParser({fields, header: false});
          const csv = json2csvParser.parse(books) + newLine;

          fs.appendFile('library.csv', csv, function (err) {
            if (err) 
              throw err;
              //console.log('The "data to append" was appended to file!');
            }
          );

        } else if (err.code == 'ENOENT') {
          //console.log('Creating new file...')
          const json2csvParser = new Json2csvParser({fields, header: true});
          const csv = json2csvParser.parse(books) + newLine;
          fs.writeFile('library.csv', csv, function (err) {
            if (err) 
              throw err;
              //console.log('file saved');
            }
          );

        } else {
          console.log('Error Has Occurred: ', err.code);
        }

      })

    }).catch(err => {

      throw new Error('Something Went Wrong')

    })

  },

  reorderCSV: (answers) => {
    reorder({
      input: './library.csv',
      output: './library.csv',
      sort: answers.categorySort,
      type: 'number',
      descending: answers.Descending,
      remove: true,
      metadata: false
    })

    console.log('A file called library.csv has been created in your root directory')
  }
}
