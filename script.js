
// AS PARTES ONDE POSSUI COMENTARIOS FOI EU (O copilot também sugeriu algumas coisas) QUE ADICIONEI, PARA ENTENDER MELHOR O CODIGO E FICAR ORGANIZADO.

// Variáveis globais
let cpf = document.getElementById("cpf").value;
let soma1 = 0;
let resto1 = 0;
let resto2 = 0;
let soma2 = 0;

// Função para validar o CPF
function aplicarMascara(input) { // Função para aplicar a máscara de CPF
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros 3 dígitos
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os próximos 3 dígitos
    valor = valor.replace(/(\d{3})(\d)/, '$1-$2'); // Adiciona hífen após os próximos 3 dígitos
    input.value = valor; // Atualiza o valor do input com a máscara aplicada
} // Função para adicionar pontos e traços ao CPF digitado pelo usuário (Fui eu que adicionei o comentário, para ficar melhor de entender)

function validarCPF(cpf) { // Função para limpar o CPF e validar se é válido ou não
    let cpfLimpo = cpf.replace(/\D/g, ""); // Limpar tudo que não seja número e deixar só os números do cpf ou seja limpo

    // 1.0 Validação do Tamanho e Repetição.
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) { 
        console.log("CPF Inválido!");
        return false;
    }
    // 2.0 Cálculo do Primeiro Dígito Verificador (O Soma1)
    let soma1 = 0;
    // 2.1 Loop para passar pelas posições de 0 a 8 (que são os 9 primeiros digitos)
    for (let i = 0; i <9; i++){ //está somando 1 a cada volta que dar no loop
        // 2.2 Multiplica o dígito atual pelo peso (10 - 1) e acumula em soma 1
        soma1 += parseInt(cpfLimpo[i]) * (10 - i);
    }
    // 2.3. Calculo do Resto de 1
    let resto1 = (soma1 * 10) % 11; // o resto de 1 vai ser = soma vezes 10 dividido por 11
    // 2.5 Se o resto for 10 ou 11, o digito verificador deve ser 0
    if (resto1 === 10 || resto1 === 11) {
        resto1 = 0;
    }
    // 2.7 Validação do primeiro digito (posição 9 do cpflimpo)
    if (resto1 !== parseInt(cpfLimpo[9])) {
        console.log("Primeiro digito verificador inválido!");
        return false;
    }
    // 3.0 Cálculo do Segundo Dígito Verificador (Soma 2 - Pesos de 11 a 2)
    let soma2 = 0;
    for (let i = 0; i < 10; i++) {
        soma2 += parseInt(cpfLimpo[i]) * (11 - i);     
    }
    let resto2 = (soma2 * 10) % 11;
    if (resto2 === 10 || resto2 === 11) {
        resto2 = 0;
    }
    if (resto2 !== parseInt(cpfLimpo[10])) {
        console.log("Segundo dígito verificador inválido!");
        return false;
    }

    // Se passou por todas as barreiras, o CPF é verdadeiro!
    console.log("CPF Válido com Sucesso");
    return true;
}

function testarValidacao(event) {
    event.preventDefault(); // Impede que a página recarregue

    let valorInput = document.getElementById("cpf").value;
    let resDiv = document.getElementById("resultado");
    let valido = validarCPF(valorInput);

    if (valido) {
        // Se o CPF for VÁLIDO:
        resDiv.style.color = "#83f631"; // Cor verde da nossa paleta
        resDiv.innerText = "✅ CPF Válido com Sucesso!";
    } else {
        // Se o CPF for INVÁLIDO:
        resDiv.style.color = "#fa4f5e"; // Cor vermelha da nossa paleta
        resDiv.innerText = "❌ CPF Inválido!";
    }
}


