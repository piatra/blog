module.exports = function (grunt) {

  grunt.initConfig({
    markdown: {
      all: {
        files: [
          {
          expand: true,
          src: 'src/*.md',
          dest: 'dest/',
          ext: '.html'
        }
        ],
        options: {
          template: 'dest/src/template.jst',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'markdown');
  grunt.registerTask('update', 'update-index');

};
