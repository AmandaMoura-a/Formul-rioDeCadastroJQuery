$(document).ready(function() {
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#cep').mask('00000-000');

    $('#tipoTelefone').change(function() {
        var tipo = $(this).val();
        var mask = tipo === 'celular' ? '(00) 00000-0000' : '(00) 0000-0000';
        $('#telefoneNumero').val('').mask(mask);
    }).change();

    $.validator.addMethod("telefoneBR", function(value, element) {
        value = value.replace(/[^\d]/g, '');

        if ($('#tipoTelefone').val() === 'celular') {
            return value.length === 11;
        } else {
            return value.length === 10;
        }
    }, "Por favor, digite um telefone válido.");


    $.validator.addMethod("cpfBR", function(value, element) {

        var numbers = value.replace(/\D/g, '');

        if (numbers.length !== 11) return false;

        return true;
    }, "Por favor, digite um CPF válido.");

    $.validator.addMethod("cepBR", function(value, element) {
        return /^\d{5}-\d{3}$/.test(value);
    }, "Por favor, digite um CEP válido.");

    $('#cadastroForm').validate({
        rules: {
            nomeCompleto: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            telefoneNumero: {
                required: true,
                telefoneBR: true
            },
            cpf: {
                required: true,
                cpfBR: true
            },
            endereco: {
                required: true
            },
            cep: {
                required: true,
                cepBR: true
            }
        },
        messages: {
            nomeCompleto: {
                required: "Por favor, digite seu nome completo."
            },
            email: {
                required: "Por favor, digite seu e-mail.",
                email: "Por favor, digite um e-mail válido."
            },
            telefoneNumero: {
                required: "Por favor, digite seu telefone.",
                telefoneBR: "Por favor, digite um telefone válido."
            },
            cpf: {
                required: "Por favor, digite seu CPF.",
                cpfBR: "Por favor, digite um CPF válido."
            },
            endereco: {
                required: "Por favor, digite seu endereço."
            },
            cep: {
                required: "Por favor, digite seu CEP.",
                cepBR: "Por favor, digite um CEP válido."
            }
        }
    });
});