describe('Testes para o formulário de candidatura', () => {

  beforeEach(() => {
    cy.visit('https://ebac-jobs-e2e.vercel.app');
  })

  it('Deve renderizar o formulário candidatura da vaga correta', () => {
    cy.get('.Vaga_vagaLink__DeFkk').first().click();

    cy.get('input').should('have.length', 7)
    cy.get('.Aplicacao_aplicacao__uGZIR > h2')
      .should('have.text', 'Candidate-se para a vaga Desenvolvedor front-end')

      cy.screenshot('tela-candidatura')
    })

  it('Deve preencher o formulário corretamente', () => {
    cy.get('.Vaga_vagaLink__DeFkk').first().click();

    cy.get('input[name=nome-completo]').type('Gabriel Guaitanele Niszczak')
    cy.get('input[name=email]').type('gabriel@teste.com')
    cy.get('input[name=telefone]').type('11 12345678')
    cy.get('input[name=endereco]').type('Rua teste da silva, São Paulo - SP')


    cy.get('#linux').check();
    cy.get('select[name=escolaridade]').select('outros');

    cy.get('button[type=submit]').click()

    cy.on('window:alert', (content) => expect(content).contain('Obrigado pela candidatura!'))

    cy.screenshot('tela-candidatura-preenchido')

  })
})