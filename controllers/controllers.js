const fs = require('fs');
const rp = require("request-promise");
const Json2csvParser = require('json2csv').Parser;
const reorder = require('csv-reorder');

const newLine = "\r\n"; // New line when appending rows to CSV

/**
 * @summary Column Headers (fields is a reserved keyword)
*/
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

  /**
   * @requires module:fs
   * @requires module:request-promise
   * @requires module:json2csv
   * @param  {} searchParameters
   * @summary This function hooks into the Google Books API to search
   * for books and output the library.csv file
   */
  searchGoogleBooks: (searchParameters) => {

    /**
     * @summary Enters search parameters as well as URL
     */

    if (!searchParameters.q) {
      throw new Error('Missing Search Parameters')
    }

    const bookRequest = {
      uri: 'https://www.googleapis.com/books/v1/volumes?',
      qs: {
        q: `${searchParameters.q}`
      },
      json: true
    }

    // If the user enters additional search parameters ex. (maximum results, search
    // index, etc.) include them with request
    for (let key in searchParameters) {
      if (key != 'q') {
        bookRequest.qs.key = searchParameters.key
      }
    }

    /**
     * @param  {} bookRequest
     * @summary GET request to Google Books API
     */
    rp(bookRequest, function (error, response, body) {

      if (error) {
        throw error // Throw error if one occurred during search
      }

      console.log('\nstatusCode:', response && response.statusCode); // Print theresponse status code if a response was received

      let books = body.items //Results from Google Books API

      /**
         * @summary Check status of library.csv (existing/non-existent)
         */
      fs.stat('library.csv', function (err, stat) {

        if (err == null) {

          const json2csvParser = new Json2csvParser({fields, header: false});
          const csv = json2csvParser.parse(books) + newLine;

          // Append search results to existing library.csv file
          fs.appendFile('library.csv', csv, function (err) {
            if (err) 
              throw err;
            console.log('The "data to append" was appended to file!');
          });

        } else if (err.code == 'ENOENT') {

          // Create new file (library.csv) with search results
          console.log('Creating new file...')
          const json2csvParser = new Json2csvParser({fields, header: true});
          const csv = json2csvParser.parse(books) + newLine;
          fs.writeFile('library.csv', csv, function (err) {
            if (err) 
              throw err;

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
  /**
   * @requires module:csv-reorder
   * @param  {} answers
   * @summary Reorders library.csv by column (to be specified by user in searchBooks())
   */
  reorderCSV: (answers) => {
    reorder({
      input: './library.csv',
      output: './library.csv',
      sort: answers.categorySort,
      type: 'number',
      descending: answers.descending,
      remove: true,
      metadata: false
    })

    console.log('A file called library.csv has been created in your root directory')
  },

  /**
 * @requires module:fs
 * @summary Removes library.csv to create new one
 */
  removeLibrary: () => {
    console.log('removing library.csv')
    fs
      .stat('./library.csv', function (err, stats) {
        if (!err) {

          fs
            .unlink('./library.csv', function (err) {
              if (err) 
                throw err
              console.log('file deleted successfully');
            });
        }
      });
  }
}
