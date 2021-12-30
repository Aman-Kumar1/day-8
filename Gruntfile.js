var config = require("./gruntConfig.json");
var fileSys = require("fs");
var buildConfig;
module.exports = function (grunt) {
    if (fileSys.existsSync("./buildpath.json")) {
        buildConfig = grunt.file.readJSON("./buildpath.json");
    }
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        name: "game",
        buildPath: (buildConfig) ? buildConfig.buildPath : config.paths.buildPath,
        sourcePath: config.paths.sourcePath,
        jsDir: config.paths.sourcePath + config.paths.jsPath,
        libDir: config.paths.sourcePath + config.paths.libPath,
        libDesDir: config.paths.buildPath + config.paths.libPath,
        tsDir: config.paths.sourcePath + config.paths.tsPath,
        assetsDir: config.paths.sourcePath + config.paths.assetsPath,
        imagesDir: config.paths.imagesPath,
        imagesDesDir: "<%= buildPath %>" + config.paths.assetsPath + config.paths.imagesPath,
        jsDestDir: "<%= buildPath %>" + config.paths.jsPath,
        lessDir: config.paths.sourcePath + config.paths.lessPath,
        cssDir: "<%= buildPath %>" + config.paths.cssPath,
        assetDestDir: "<%= buildPath %>" + config.paths.assetsPath,
        dtRes: config.supportedResolutions.desktop,
        hdRes: config.supportedResolutions.hd,
        sdRes: config.supportedResolutions.sd,
        ldRes: config.supportedResolutions.ld
    });
    console.log("Build Path Config ", grunt.config("buildPath"));
    require('load-grunt-tasks')(grunt);
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('grunt'),
        fileExtensions: ['js']
    }, function (err) {
        grunt.log.error(err)
    });
    grunt.registerTask('default', ["browserSync", "watch"]);
    grunt.registerTask('debug', ['tslint', 'copy', 'less:debug', 'concatManifest', 'updateGameDebug:debug', 'fileindex', 'listManifest', 'ts', 'copy:debug']);
    grunt.registerTask("lint", ['tslint']);
    grunt.registerTask('buildSoundSprite', ['exec:buildSound' + ':Source/res']);
    grunt.registerTask('build', ['clean:build', 'copy:main', 'concatManifest', 'updateGameDebug:build', 'copy:images', 'fileindex', 'listManifest', 'less:build', 'ts', 'concat', 'uglify:build', 'clean:js']);
};