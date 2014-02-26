var path = require('path');
var fs   = require('fs');

module.exports = function (grunt) {

  grunt.registerTask('update-index', function () {

    var cheerio = require('cheerio');
    var files = grunt.file.expand('src/*.md');
    files = files.map(extractName)
    .map(createTitle);


    content = files.map(createHTML);
    content.sort(function(a, b) {
        return b.date-a.date;
    });
    var $ = cheerio.load(fs.readFileSync('dest/src/index.html'));
    $('.articles').empty();
    content.forEach(function (article) {
      $('.articles').append(article.title);
    });

    fs.writeFileSync('dest/src/index.html', $.html());

  });

};

function createHTML (file) {
  file.title = file.title.split(' ');
  var time = file.title.splice(file.title.length-3, 3).join(' ');
  return {
    filename: file.filename,
    title: '<h3><a href="' + file.filename + '.html">' + file.title.join(' ') + '</a><time>'+time+'</time></h3>',
    date: (new Date(time)).getTime()
  };
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
  };
}

function capitaliseTitle (title) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}
