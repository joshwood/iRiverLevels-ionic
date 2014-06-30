
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: ['www', 'vendor'],
                livereload: true
            },
            proxies: [
                {
                    context: '/dchaney',
                    host: 'www.darrenchaney.com',
                    port: 80,
                    https: false,
                    changeOrigin: true,
                    xfoward: false,
                    rewrite: {
                        '^/dchaney' : ''
                    }
                },
                {
                    context: '/ahps2',
                    host: 'water.weather.gov',
                    port: 80,
                    https: false,
                    changeOrigin: true,
                    xfoward: false
                }
            ],
            livereload: {
                options: {
                    middleware: function (connect, options) {
                        var middlewares = [];
                        var directory = options.directory || options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        options.base.forEach(function(base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        // Setup the proxy
                        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            }
        },
        watch: {
            all: {
                // Replace with whatever file you want to trigger the update from
                // Either as a String for a single entry
                // or an Array of String for multiple entries
                // You can use globing patterns like `css/**/*.css`
                // See https://github.com/gruntjs/grunt-contrib-watch#files
                files: 'www/**/*.*',
                options: {
                    livereload: true
                }
            }
        },

        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                path: 'http://localhost:9000'
            }
        }
    });

    /**
     * starts a dev server at port 9000, with live-reload,
     * starts our node server at port 3030 (which also opens a websocket at port 3000),
     * establishes a proxy from our dev:9000 server to node:3030 so we can access all of our
     * data URLS and use sockets when in our development server using live-reload like a champ.
     */
    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'configureProxies:server',
            'connect:livereload',
            //'open',  // you can uncomment this and the task will open your default browser to the URL - it's a little annoying sometimes
            'watch'
        ]);
    });

};

