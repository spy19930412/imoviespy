module.exports = function(grunt){

	grunt.initConfig({

	})
	
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')

    grunt.option('force',true)
    grunt.registerTask('default',['concurrent'])
}