describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'name1',
      name: 'Name 1',
      password: '1234',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('name1')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.get('#success_login').contains('Name 1 logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('name')
      cy.get('#password').type('12345')
      cy.contains('log in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'name1', password: '1234' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('www.blog.com')
      cy.get('#submit-button').click()
      cy.get('#blogTitle').contains('title')
    })

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'www.url1.com' })
      cy.get('#showBlogs').click()
      cy.get('#likeButton').click()
      cy.get('[class="success"]')
    })

    it('A blog can be deleted', function () {
      cy.createBlog({ title: 'title1', author: 'author1', url: 'www.url1.com' })
      cy.get('#showBlogs').click()
      cy.get('#deleteButton').click()
      cy.get('[class="success"]')
    })
  })

  describe('When several blogs creaded by many people exist', function () {
    beforeEach(function () {
      cy.login({ username: 'name1', password: '1234' })
      cy.createBlog({
        author: 'John Doe',
        title: 'test1',
        url: 'http://example.com./test1',
      })
      cy.createBlog({
        author: 'John Doe',
        title: 'test2',
        url: 'http://example.com./test2',
      })
      cy.createBlog({
        author: 'John Doe',
        title: 'test3',
        url: 'http://example.com./test3',
      })

      cy.contains('test1').parent().parent().as('blog1')
      cy.contains('test2').parent().parent().as('blog2')
      cy.contains('test3').parent().parent().as('blog3')
    })

    it('ordered by number of likes', function () {
      cy.get('@blog1').contains('show').click()
      cy.get('@blog2').contains('show').click()
      cy.get('@blog3').contains('show').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blogs').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})
