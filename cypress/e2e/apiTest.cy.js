const { onArticlePage } = require("../support/pageObjects/articlePage")
const { onHomePage } = require("../support/pageObjects/homePage")

describe('template spec', () => {

  beforeEach('login to application', () => {
    cy.intercept({ method: 'Get', path: 'tags' }, { fixture: 'tags.json' })
    cy.loginToApplication()
  })

  it('verify Data', () => {

    onArticlePage.verifyData('new article','new description','new body')

  })
  
  it('changing Tags', () => {

    onHomePage.changingTags()

  })

  it('verify Counts', () => {
    
    onHomePage.verifyCounts()

  })

  it('working with request and response', () => {
    
    onArticlePage.workingWithRequestAndResponse()

  })
})