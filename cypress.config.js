const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  env:{
   email:'jovan85@test.com',
   password:'zk@jkWBWS5R@V7',
   apiUrl:'https://api.realworld.io'
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
})