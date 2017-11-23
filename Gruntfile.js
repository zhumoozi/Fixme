/**
 * Create by xiaofu.qin {2017/11/15}
 * description:
 */
module.exports = (grunt) => {
    "use strict";

    // initConfig
    grunt.initConfig({

        // load package info
        pkg: grunt.file.readJSON("package.json"),

        // watch task
        watch: {

            // Listen to the backend js file changes and restart the server
            backend: {
                files: ["app.js", "backend/**/*.js"],
                tasks: ["develop"],
                options: {
                    nospawn: true
                }
            },

            // Listen the cs file changes and packaged all css contents into one css file.
            css: {
                files: ["!static/css/all.js", "static/**/*.css"],
                tasks: ["clean:dev", "cssmin:dev"]
            }
        },

        // Restart the node server
        develop: {
            server: {
                file: "app.js"
            }
        },

        // Packaged all css files into one css file.
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            dev: {
                files: {
                    "static/css/all.css": ["!static/css/all.css", "static/css/**/*.css"]
                }
            },
            build: {
                "build/static/css/all.css": "static/css/all.css"
            }
        },

        // Minify the html files
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    // for index.html
                    // 'build/index.html': 'index.html',
                    src: "index.html",
                    dest: "build/index.html"
                },{
                    // for all 404 pages
                    expand: true,
                    cwd: 'static',
                    src: ['404/**/*.html'],
                    dest: 'build/static'
                }]
            }
        },

        //Clean
        clean: {
            dev: ["static/css/all.css"],
            build: ["build"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-develop");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");


    grunt.registerTask("default", ["develop", "watch"]);
    grunt.registerTask("build", ["clean:build", "cssmin:build", "htmlmin"]);

};