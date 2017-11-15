/**
 * Create by xiaofu.qin {2017/11/15}
 * description:
 */
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            js: {
                files: ["app.js", "backend/*.js"],  //can use regex to match file
                tasks: ['develop'],
                options: {
                    nospawn: true
                    //is important !You need to specify nospawn : true i
                    // n your watch task configuration so that the called tasks run in the same context.
                }
            }
        },
        develop: {
            server: {
                file: 'app.js'  //the file to start server
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-develop');

    grunt.registerTask('default', ['develop', 'watch']);
};
 