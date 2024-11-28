describe('Consulta de signos do zodíaco', () => {

  // Teste 1: Verificar se a página carrega corretamente
  it('Deve carregar a página com sucesso', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    cy.contains('Descubra seu Signo').should('be.visible');
    cy.contains('Vamos ver o que seu signo tem a revelar!').should('be.visible');
  });

  // Teste 2: Verificar se o campo de Data de Nascimento está visível
  it('Deve exibir o campo de Data de Nascimento', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    cy.get('#data_nascimento').should('be.visible'); // Verifica se o campo está visível
  });

  // Teste 3: Verificar se o campo de Data de Nascimento aceita digitação
  /*it('Deve permitir digitar uma data no campo', () => {
    const dataNascimento = '2024-02-20'; // Data válida

    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.get('#data_nascimento').type(dataNascimento).should('have.value', dataNascimento);
  });*/

  // Teste 4: Verificar se o formulário pode ser enviado
  it('Deve preencher e enviar o formulário de consulta de signo', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    
    const dataNascimento = '2024-02-20';
    cy.get('#data_nascimento').type(dataNascimento);
    cy.get('#signo-form').submit(); // Submete o formulário

    // Verifica se a resposta está visível, com base no signo correspondente
    cy.contains('Seu signo é:').should('be.visible');
  });

  // Teste 5: Verificar a resposta para um signo válido
  it('Deve mostrar o signo correto para uma data válida', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    
    const dataNascimento = '2024-03-21'; // Data para Áries
    cy.get('#data_nascimento').type(dataNascimento);
    cy.get('#signo-form').submit();

    cy.contains('Seu signo é: Áries').should('be.visible');
    cy.contains('Pessoas de Áries são corajosas, entusiastas e cheias de energia.').should('be.visible');
  });

  // Teste 6: Verificar a resposta para uma data inválida
  /*it('Deve mostrar erro para uma data inválida', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    
    const dataNascimento = 'invalid-date'; // Data inválida
    cy.get('#data_nascimento').type(dataNascimento);
    cy.get('#signo-form').submit();

    cy.contains('Data inválida! Não foi possível encontrar um signo correspondente.').should('be.visible');
  });*/

  // Teste 7: Verificar se o botão "Voltar" redireciona para a página inicial
  it('Deve redirecionar para a página inicial ao clicar em Voltar', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    
    const dataNascimento = '2024-03-21'; // Data para Áries
    cy.get('#data_nascimento').type(dataNascimento);
    cy.get('#signo-form').submit();
    
    // Verifica se a página de resposta contém o botão Voltar
    cy.get('a.btn-secondary').click();
    
    // Verifica se redirecionou de volta para a página inicial
    cy.url().should('include', 'index.php');
  });

  // Teste 8: Verificar se o footer está presente e contém o texto correto
  it('Deve exibir o footer com o texto correto', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    cy.get('footer .text-muted').should('be.visible');
    cy.contains('Desenvolvido por: Eduardo Marques Costa').should('be.visible');
  });

  // Teste 9: Verificar se o campo de Data de Nascimento exige um valor
  /*it('Deve exigir um valor para o campo de Data de Nascimento', () => {
    cy.request('GET', 'http://localhost/Project/layouts/index.php')
      .its('status')
      .should('eq', 200); // Verifica se a resposta é 200 OK

    cy.visit('http://localhost/Project/layouts/index.php');
    
    cy.get('#signo-form').submit(); // Envia o formulário sem preencher o campo
    
    // Verifica se o campo exibe uma mensagem de erro
    cy.get('#data_nascimento:invalid').should('exist');
  });*/

  // Teste 10: Verificar o signo correto para todas as datas possíveis
  const datas = [
    { data: '2024-03-21', signo: 'Áries' },
    { data: '2024-04-21', signo: 'Touro' },
    { data: '2024-05-21', signo: 'Gêmeos' },
    { data: '2024-06-21', signo: 'Câncer' },
    { data: '2024-07-23', signo: 'Leão' },
    { data: '2024-08-23', signo: 'Virgem' },
    { data: '2024-09-23', signo: 'Libra' },
    { data: '2024-10-23', signo: 'Escorpião' },
    { data: '2024-11-22', signo: 'Sagitário' },
    { data: '2024-12-22', signo: 'Capricórnio' },
    { data: '2024-01-21', signo: 'Aquário' },
    { data: '2024-02-20', signo: 'Peixes' },
  ];

  datas.forEach(({ data, signo }) => {
    it(`Deve mostrar o signo correto para a data ${data}`, () => {
      cy.request('GET', 'http://localhost/Project/layouts/index.php')
        .its('status')
        .should('eq', 200); // Verifica se a resposta é 200 OK

      cy.visit('http://localhost/Project/layouts/index.php');
      cy.get('#data_nascimento').type(data);
      cy.get('#signo-form').submit();
      cy.contains(`Seu signo é: ${signo}`).should('be.visible');
    });
  });

});
