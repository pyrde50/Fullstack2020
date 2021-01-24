describe('Blog app', function() {
  beforeEach(function() {
    cy.register({ name: 'testeri' ,username: 'testaaja', password: 'testaaja1' })
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('testaaja')
      cy.get('#Password').type('testaaja1')
      cy.get('#login-button').click()

      cy.contains('testeri logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('testaaja')
      cy.get('#Password').type('testaaja2')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'testaaja1' })
    })

    it('A blog can be created', function() {
      cy.contains('create new Blog').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testaaja')
      cy.get('#url').type('www.facebook.fi')
      cy.contains('create!').click()

      cy.get('.finding').contains('new Blog testi added')
    })

    describe('when blog has been created', function () {
      beforeEach(function() {
        cy.addBlog({ title: 'testi1', author: 'testaaja', url: 'www.facebook.fi' })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.get('Delete').should('not.exist')
      })

      it('Blogs should be sorted by likes', function() {
        cy.addBlog({ title: 'testi2', author: 'testaaja2', url: 'www.facebook.fi', likes: 10 })
        cy.addBlog({ title: 'testi3', author: 'testaaja3', url: 'www.facebook.fi', likes: 20 })
        cy.addBlog({ title: 'testi4', author: 'testaaja4', url: 'www.facebook.fi', likes: 30 })
        cy.contains('view').click().then(() => {
          cy.contains('likes 30')
          cy.contains('hide').click()
        })
        cy.contains('testi3')
          .contains('view').click().then(() => {
            cy.contains('likes 20')
            cy.contains('hide').click()
          })
        cy.contains('testi2')
          .contains('view').click().then(() => {
            cy.contains('likes 10')
            cy.contains('hide').click()
          })
        cy.contains('testi1')
          .contains('view').click().then(() => {
            cy.contains('likes 0')
          })
      })
    })
  })
})