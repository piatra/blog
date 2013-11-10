var path = require('path');
var fs   = require('fs');

module.exports = function (grunt) {

  grunt.registerTask('update-index', function () {

    var cheerio = require('cheerio');
    var files = grunt.file.expand('src/*.md');
    files = files.map(extractName)
    .map(createTitle)

    content = files.map(createHTML);
    var $ = cheerio.load(fs.readFileSync('dest/src/index.html'));
    $('body').empty();
    content.forEach(function (article) {
      $('body').append(article.title);
    });

    fs.writeFileSync('dest/src/index.html', $.html());

  });

};

function createHTML (file) {
  return {
    filename: file.filename,
    title: '<h3>' + file.title + '</h3>'
  }
}

function extractName (file) {
  file = file.split(path.sep).pop();
  return file.split('.')[0];
}

function createTitle (filename) {
  title = filename.split('_').join(' ');
  return {
    filename: filename,
    title: capitaliseTitle(title)
  }
}

function capitaliseTitle (title) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}
