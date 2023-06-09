export class articlePage {

    verifyData(article, description, body) {
        cy.intercept('POST', Cypress.env('apiUrl') + '/api/articles/').as('postArticle')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type(article)
        cy.get('[formcontrolname="description"]').type(description)
        cy.get('[formcontrolname="body"]').type(body)
        cy.contains('Publish Article').click()

        cy.wait('@postArticle').then(resp => {
            console.log(resp)
            expect(resp.response.statusCode).to.equal(200)
            expect(resp.request.body.article.body).to.equal(body)
            expect(resp.response.body.article.description).to.equal(description)
        })
    }

    workingWithRequestAndResponse() {
        cy.intercept('POST', '**/articles/', (res) => {
            res.body.article.description = "modify description"
        }).as('postArticle')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type('New article')
        cy.get('[formcontrolname="description"]').type('new description')
        cy.get('[formcontrolname="body"]').type('new body')
        cy.contains('Publish Article').click()

        cy.wait('@postArticle')
        cy.get('@postArticle').then(resp => {
            console.log(resp)
            expect(resp.request.body.article.body).to.equal('new body')
            expect(resp.request.body.article.description).to.equal('modify description')
        })
    }
}

export const onArticlePage = new articlePage()