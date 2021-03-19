module.exports = function (config) {
  //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  config.set({
    //UI5 framework
    frameworks: ["ui5"],    
    basePath: "",
    ui5: {
    	url: "https://sapui5.hana.ondemand.com",
      type: "application",
    	mode: "html",
    	testpage: "webapp/test/testsuite.qunit.html",
    	paths: {
    		webapp: "webapp"
    	}
    },
    proxies: {
      '/base/resources': {
        'target': 'https://sapui5.hana.ondemand.com/1.71.35/resources',
        'changeOrigin': true 
      }
    },
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    loggers : [{
      type: 'console',
      level: 'INFO'
    }],

    proxyValidateSSL: false,
       
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    
    preprocessors: {
      "{webapp,webapp/!(test)}/*.js": ['coverage']
    },

    coverageReporter: {
      reporters : [
        {
          type : 'cobertura',
          dir : 'tests/results/coverage/',
          subdir: '.'
        },{
          type : "text",
          dir : 'coverageText/'
        }
      ],
      check: {
        each: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
    },
        
    reporters: ['progress', 'coverage', 'junit'],
    junitReporter: {
      outputDir: "tests/results/junit/",
    	outputFile: "result.xml",
      useBrowserName: false
    }
  });
  require("karma-ui5/helper").configureIframeCoverage(config);
};