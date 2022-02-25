Cypress.Commands.add('login', ({ username, password }) => {
  cy.contains('log in').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('create new blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#submit-button').click()
  cy.visit('http://localhost:3000')
})

