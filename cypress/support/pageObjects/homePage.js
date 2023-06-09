export class HomePage {

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

}

export const onHomePage = new HomePage()