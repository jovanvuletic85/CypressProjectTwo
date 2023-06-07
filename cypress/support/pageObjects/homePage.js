export class HomePage {

    verifyData(article, description, body) {
        cy.intercept('POST', Cypress.env('apiUrl') + '/api/articles/').as('postArticle')

        cy.contains('New Article').click()
        cy.get('[formcontrolname="title"]').type(article)
        cy.get('[formcontrolname="description"]').type(description)
        cy.get('[formcontrolname="body"]').type(body)
        cy.contains('Publish Article').click()

        cy.wait('@postArticle').then(resp => {
            console.log(resp)
            //expect(resp.response.statusCode).to.equal(200)
            expect(resp.request.body.article.body).to.equal(body)
            expect(resp.response.body.article.description).to.equal(description)
        })
    }

    changingTags() {
        cy.get('[class="tag-list"]')
            .should('contain', 'Jovan')
            .and('contain', 'Vuletic')
            .and('contain', 'cypress')
    }

    verifyCounts() {
        cy.intercept('GET', Cypress.env('apiUrl') + '/api/articles/feed*', { "articles": [], "articlesCount": 0 })
        cy.intercept('GET', Cypress.env('apiUrl') + '/api/articles?limit*', { fixture: 'articles.json' })

        cy.contains(' Global Feed ').click()
        cy.get('app-article-list button').then(ionHeart => {
            expect(ionHeart[0]).to.contain('1')
        })

        cy.fixture('articles').then(file => {
            const article = file.articles[0].slug
            file.articles[0].favoritesCount = 3

            cy.intercept('POST', Cypress.env('apiUrl') + '/api/articles/' + article + '/favorite', file)
        })
        cy.get('app-article-list button').eq(1).click().should('contain', '3')
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

export const onHomePage = new HomePage()