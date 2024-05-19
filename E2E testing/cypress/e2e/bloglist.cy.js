// import the beforeEach

describe("Blog app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("Welcome to my Bloglist Application :-)");
  });

  // making the test to login to the login form exercise 5.17
  it("Login form is shown", function () {
    cy.visit("http://localhost:5173"); // to be removed
    cy.contains("Login").click();

    // typing something in the input of the form
    // cy.get("#username").type("Lenny2030");
    // cy.get("#password").type("charlene");
    // cy.get("#login-button").click();

    // checking if the login has worked
    // cy.contains("Lenny Thobejane has logged in");
  });

  // making a test for the loging in exercise 5.18
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit("http://localhost:5173"); // to be removed
      cy.contains("Login").click();

      //
      cy.get("#username").type("Lenny2030");
      cy.get("#password").type("charlene");
      cy.get("#login-button").click();

      // checking if the login has worked
      cy.contains("Lenny Thobejane has logged in");
    });

    it("fails with wrong credentials", function () {
      cy.visit("http://localhost:5173"); // to be removed
      cy.contains("Login").click();

      //
      cy.get("#username").type("charlene");
      cy.get("#password").type("zizipho");
      cy.get("#login-button").click();

      // checking if the login has worked
      cy.contains("Wrong password or username");
    });
  });

  // making tests for the user is logged in exercise 5.19
  describe("When logged in", function () {
    // add a beforeEach function here that logs in

    it("A blog can be created", function () {
      cy.visit("http://localhost:5173"); // to be removed
      cy.contains("Login").click();

      //
      cy.get("#username").type("Lenny2030");
      cy.get("#password").type("charlene");
      cy.get("#login-button").click();

      // checking if the login has worked
      cy.contains("Lenny Thobejane has logged in");

      // making sure the user can create a new post
      cy.contains("create new blog").click();
      cy.get("#create-blog-button").click();
      cy.get("#create-blog-button").click();
      cy.get("#title").type("The day the earth stood still");
      cy.get("#author").type("Lenny and Zizi");
      cy.get("#url").type("www.africaterings.onrender.com");

      // clicking the button to send over the form
      cy.get("#create-blog-button").click();

      // check for this after a blog has been created
      cy.contains("Blog created!");
    });
    it("Can a user like a blog", function () {
      cy.visit("http://localhost:5173"); // to be removed
      cy.contains("Login").click();

      //
      cy.get("#username").type("Lenny2030");
      cy.get("#password").type("charlene");
      cy.get("#login-button").click();

      // checking if the login has worked
      cy.contains("Lenny Thobejane has logged in");

      // making sure the user can like a blog, for this we are going to use the first blog post
      cy.contains("Lenny the dance machine Lenny")
        .parent()
        .find("button")
        .click();

      // cy.contains("like").click();

      // cy.contains("Blog liked!");
    });
  });
});
