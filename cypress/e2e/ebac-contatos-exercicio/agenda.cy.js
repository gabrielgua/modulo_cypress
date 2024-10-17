/// <reference types="cypress" />

describe('Testes para as funcionalidades do projeto ebac-agenda', () => {

  const nome = 'Gabriel Guaitanele';
  const telefone = '10 912344321';
  const email = 'gabriel.guaitanele@email.com';
  
  function adicionarContato() {
    cy.get('input[type=text]').type(nome);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=tel]').type(telefone);
  
    cy.get('.adicionar').click();
  }

  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app');
  })

  it('Deve adicionar um novo contato', () => {
    adicionarContato();

    cy.get('.contato .sc-eDDNvR > :nth-child(1)').last().should('have.text', nome);
    cy.get('.contato .sc-eDDNvR > :nth-child(2)').last().should('have.text', telefone);
    cy.get('.contato .sc-eDDNvR > :nth-child(3)').last().should('have.text', email);
  })
})

