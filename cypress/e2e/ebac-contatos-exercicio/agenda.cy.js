/// <reference types="cypress" />

describe('Testes para as funcionalidades do projeto ebac-agenda', () => {

  const nome = 'Novo Contato';
  const telefone = '10 912344321';
  const email = 'contato@email.com';
  
  function adicionarContato() {
    cy.get('input[type=text]').type(nome);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=tel]').type(telefone);
  
    cy.get('.adicionar').click();
    cy.wait(1000)
  }

  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app');
  })

  it('Deve adicionar um novo contato', () => {
    adicionarContato();

    
    cy.get('.contato').last().should('contain.text', nome);
    cy.get('.contato').last().should('contain.text', telefone);
    cy.get('.contato').last().should('contain.text', email);
  })

  it('Deve popular o formulário quando o botão de editar for clicado', () => {
    adicionarContato();

    cy.get('.edit').last().click();

    cy.get('input[type=text]').should('have.value', nome);
    cy.get('input[type=email]').should('have.value', email);
    cy.get('input[type=tel]').should('have.value', telefone);
    
  })

  it('Deve mostrar os botões de salvar e cancelar a edição', () => {
    adicionarContato();

    cy.get('.edit').last().click();

    cy.get('.alterar').should('exist');
    cy.get('.cancelar').should('exist');
  })

  it('Deve editar um contato', () => {
    adicionarContato();

    cy.get('.edit').last().click();

    cy.get('input[type=text]').clear().type('Contato editado');
    cy.get('input[type=email]').clear().type('editado@email.com');
    cy.get('input[type=tel]').clear().type('9999999999');

    cy.get('.alterar').click();
    cy.wait(1500)
    

    cy.get('.contato').last().should('contain.text', 'Contato editado');
    cy.get('.contato').last().should('contain.text', 'editado@email.com');
    cy.get('.contato').last().should('contain.text', '9999999999');
  })

  it('Deve remover um contato', () => {
    adicionarContato();

    cy.get('.delete').last().click();

    cy.get('.contato').last().should('not.contain.text', nome);
    cy.get('.contato').last().should('not.contain.text', email);
    cy.get('.contato').last().should('not.contain.text', telefone);
  })
})

