$(document).ready(function () {
    $('#formAlterarAluno').hide();
    $('#formListAlunos').show();
    listarTodos();
});

function openModalMateria() {
    $('#AddMateriaModal').modal('show');
    listarMaterias();
}

function closeModalMateria() {
    $('#AddMateriaModal').modal('hide');
}

function incluirMateria() {
    var nomeMateria = $('#Materia').val();
    var semestre = $('#Semestre').val();
    var idAluno = $('#Id').val();
    if (nomeMateria == null || nomeMateria == "") {
        alert("Insira uma materia!");
        $('#Materia').focus();
    } else {
        if (semestre == null || semestre == "") {
            alert("Insira o periódo!");
            $('#Semestre').focus();
        } else {
            $.ajax({
                url: '/Materia/IncluirMateria',
                type: 'POST',
                data: {
                    IdAluno: idAluno,
                    NomeMateria: nomeMateria,
                    QtdSemestre: semestre
                },
                success: function (response) {
                    $('#Materia').val("");
                    $('#Semestre').val("");
                    closeModalMateria();
                    alert("Materia incluida com sucesso!");

                },
                error: function (xhr, status, error) {
                    console.error('Erro na requisição AJAX:', error);
                }
            });
        }
    }

}

function excluirMateria(IdMateria) {
    
    var idMateria = IdMateria;

    if (confirm("Confirmar exclusão?")) {
        $.ajax({
            url: '/Materia/ExcluirMateria',
            type: 'POST',
            data: { Id: idMateria, },
            success: function (response) {
                alert("Materia excluida!");
                closeModalMateria();
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function listarMaterias() {
    var idAluno = $('#Id').val();

    $.ajax({
        url: '/Materia/ListarMaterias',
        type: 'POST',
        data: { IdAluno: idAluno },
        success: function (response) {
            var tabela = $('#listModalMaterias');
            tabela.empty();

            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    var materia = response[i];
                    var NOMEMATERIA = materia.nomeMateria;
                    var QTDSEMESTRE = materia.qtdSemestre;
                    var ID = materia.id;

                    var materiaDiv = $('<tr>' +
                        '<td>' + NOMEMATERIA + '<input type="hidden" value=" ' + ID + ' "></td>' +
                        '<td>' + QTDSEMESTRE + '</td>' +
                        '<td>' +
                        '<div class="row">' +
                        '<div class="col-md-6 col-lg-8">' +
                        '<button type="button" class="btn btn-danger" id="BtnApagar' + ID + '" style="margin: 5px" onclick="excluirMateria(' + ID + ');"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
                        '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>' +
                        '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>' +
                        '</svg>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</td>' +
                        '</tr>');
                    tabela.append(materiaDiv);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function limpar() {
    $('#Nome').val("");
    $('#CPF').val("");
    $('#matricula').val("Matricula");
    $('#Nacionalidade').val("");
    $('#CEP').val("");
    $('#Estado').val("");
    $('#Cidade').val("");
    $('#Endereco').val("");
    $('#Email').val("") + "@gmail.com";
    $('#Telefone').val("");
}

function validaForm() {

    var nome = $('#Nome').val();
    var cpf = $('#CPF').val();
    var nacionalidade = $('#Nacionalidade').val();
    var cep = $('#CEP').val();
    var estado = $('#Estado').val();
    var cidade = $('#Cidade').val();
    var endereco = $('#Endereco').val();
    var email = $('#Email').val();
    var telefone = $('#Telefone').val();
    var matricula = estado + cpf.substring(0, 3) + "0500" + nome.substring(0, 2).toUpperCase();

    //NOME
    if (nome == null || nome == "" || nome.length <= 3) {
        alert("Nome incompleto ou invalido!");
        $('#Nome').focus();
        return false;
    }
    //CPF
    cpf = cpf.replace(/\D/g, '');
    if (cpf == null || cpf == "" || cpf.length < 11) {
        alert("CPF incompleto ou invalido!");
        $('#CPF').focus();
        return false;
    }
    //NACIONALIDADE
    if (nacionalidade == null || nacionalidade == "" || nacionalidade.length <= 4) {
        alert("Nacionalidade incompleta ou invalida!");
        $('#Nacionalidade').focus();
        return false;
    }
    //CEP
    cep = cep.replace(/\D/g, '');
    if (cep == null || cep == "" || cep.length < 8) {
        alert("CEP incompleto ou invalido!");
        $('#CEP').focus();
        return false;
    }
    //ESTADO
    if (estado == null || estado == "") {
        alert("Estado é obrigatório");
        $('#Estado').focus();
        return false;
    }
    //CIDADE
    if (cidade == null || cidade == "" || cidade.length <= 2) {
        alert("Cidade invalida!");
        $('#Cidade').focus();
        return false;
    }
    //ENDEREÇO
    if (endereco == null || endereco == "" || endereco.length < 9) {
        alert("Endereço invalido!");
        $('#Endereco').focus();
        return false;
    }
    //EMAIL
    if (email == null || email == "" || email.length <= 7) {
        alert("Endereço de email invalido!");
        $('#Email').focus();
        return false;
    }
    //TELEFONE
    telefone = telefone.replace(/\D/g, '');
    if (telefone == null || telefone == "" || telefone.length < 11) {
        alert("Telefone incompleto ou invalido!");
        $('#Endereco').focus();
        return false;
    }
    //MATRICULA
    if (matricula == null || matricula == "") {
        alert("Matricula não gerada. Tente novamente!");
        return false;
    }

    return true;

}

function apenasNumeros(event) {
    const key = event.key;
    if (!/[\d\b]/.test(key)) {
        event.preventDefault();
    }
}

function mascaraCPF() {
    var cpf = $('#CPF').val();
    var cpf_formatado = '';
    cpf_formatado = cpf.replace(/\D/g, "")
    cpf_formatado = cpf_formatado.replace(/(\d{3})(\d)/, "$1.$2")
    cpf_formatado = cpf_formatado.replace(/(\d{3})(\d)/, "$1.$2")
    cpf_formatado = cpf_formatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    $('#CPF').val(cpf_formatado);
}

function mascaraCEP() {
    var cep = $('#CEP').val();
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{3})(\d)/, "$1.$2");
    cep = cep.replace(/^(\d{3}\.\d{2})(\d)/, "$1-$2");
    $('#CEP').val(cep);
}

function mascaraTEL() {
    var telefone = $('#Telefone').val();
    var telefone_formatado = '';
    telefone = telefone.replace(/\D/g, "");
    telefone_formatado = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
    telefone_formatado = telefone_formatado.replace(/(\d{5})(\d)/, "$1-$2");
    $('#Telefone').val(telefone_formatado);
}

function incluir() {

    var nome = $('#Nome').val();
    var cpf = $('#CPF').val();
    var nacionalidade = $('#Nacionalidade').val();
    var cep = $('#CEP').val();
    var estado = $('#Estado').val();
    var cidade = $('#Cidade').val();
    var endereco = $('#Endereco').val();
    var email = $('#Email').val() + "@gmail.com";
    var telefone = $('#Telefone').val();
    var matricula = estado + cpf.substring(0, 3) + "0500" + nome.toUpperCase().substring(0, 2);

    //Tratamentos
    cpf = cpf.replace(/\D/g, '');
    cep = cep.replace(/\D/g, '');
    telefone = telefone.replace(/\D/g, '');

    if (validaForm()) {
        $.ajax({
            url: '/Home/Incluir',
            type: 'POST',
            data: {
                Nome: nome,
                Cpf: cpf,
                Matricula: matricula,
                Nacionalidade: nacionalidade,
                Cep: cep,
                Estado: estado,
                Cidade: cidade,
                Endereco: endereco,
                Email: email,
                Telefone: telefone,
                _token: '{{ csrf_token() }}' // CSRF token para segurança (necessário no Laravel)
            },
            success: function (response) {
                limpar();
                window.location.href = '/Home/Index';
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function alterar() {

    var id = $('#Id').val();
    var nome = $('#Nome').val();
    var cpf = $('#CPF').val();
    var nacionalidade = $('#Nacionalidade').val();
    var cep = $('#CEP').val();
    var estado = $('#Estado').val();
    var cidade = $('#Cidade').val();
    var endereco = $('#Endereco').val();
    var email = $('#Email').val();
    var telefone = $('#Telefone').val();
    var matricula = estado + cpf.substring(0, 3) + "0500" + nome.toUpperCase().substring(0, 2);

    //Tratamentos
    cpf = cpf.replace(/\D/g, '');
    cep = cep.replace(/\D/g, '');
    telefone = telefone.replace(/\D/g, '');

    if (validaForm()) {
        $.ajax({
            url: '/Home/Alterar',
            type: 'POST',
            data: {
                Id: id,
                Nome: nome,
                Cpf: cpf,
                Matricula: matricula,
                Nacionalidade: nacionalidade,
                Cep: cep,
                Estado: estado,
                Cidade: cidade,
                Endereco: endereco,
                Email: email,
                Telefone: telefone,
                _token: '{{ csrf_token() }}' // CSRF token para segurança (necessário no Laravel)
            },
            success: function (response) {
                limpar();
                window.location.href = '/Home/Index';
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function excluir(excluir_id) {
    var id = excluir_id;

    if (confirm("Confirmar exclusão?")) {
        $.ajax({
            url: '/Home/Excluir',
            type: 'POST',
            data: { Id: id, },
            success: function (response) {
                limpar();
                apagaMateriasDoAluno(id);
                window.location.href = '/Home/Index';
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function apagaMateriasDoAluno(id) {
    debugger
    var idAluno = id;
    if (confirm("Confirmar exclusão?")) {
        $.ajax({
            url: '/Materia/ApagarMateriasAlunos',
            type: 'POST',
            data: { IdAluno: idAluno, },
            success: function (response) {
                debugger
                limpar();
                window.location.href = '/Home/Index';
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function listarTodos() {
    $.ajax({
        url: '/Home/Listar',
        type: 'POST',
        data: {},
        success: function (response) {


            var tabela = $('#tabelaListagemDeAlunos');
            tabela.empty();

            var alunos = response;

            if (alunos.length > 0) {
                for (var i = 0; i < alunos.length; i++) {

                    var aluno = alunos[i];
                    var NOME = aluno.nome;
                    var EMAIL = aluno.email;
                    var ID = aluno.id;

                    var alunoDiv = $('<tr>' +
                        '<th>' + NOME + '<input type="hidden" value=" ' + ID + ' "></th>' +
                        '<th>' + EMAIL + '</th>' +
                        '<th>' +

                        '<div class="row">' +

                        '<div class="col-md-6 col-lg-7">' +

                        '<button type="button" class="btn btn-outline-primary" id="BtnAlterar' + ID + '" style="margin: 5px" onclick="BuscarEditar(' + ID + ')"><svg id="btnAlterar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />' +
                        '</svg></button>' +

                        '<button type="button" class="btn btn-danger"  id="BtnApagar' + ID + '" style="margin: 5px" onclick="excluir(' + ID + ');"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
                        '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>' +
                        '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>' +
                        '</svg></button>' +
                        '</div>' +

                        '</div>' +

                        '</th>' +
                        '</tr>');
                    tabela.append(alunoDiv);
                }
            } else {
                alert("Nenhum aluno encontrado.");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function BuscarEditar(aluno_id) {

    var id = aluno_id
    $.ajax({
        url: '/Home/BuscarEditar',
        type: 'POST',
        data: { Id: id },
        success: function (response) {

            var aluno = response;
            limpar();

            $('#formAlterarAluno').show();
            $('#formListAlunos').hide();

            var ID = aluno.id;
            var NOME = aluno.nome;
            var CPF = aluno.cpf;
            var MATRICULA = aluno.matricula;
            var NACIONALIDADE = aluno.nacionalidade;
            var CEP = aluno.cep;
            var ESTADO = aluno.estado;
            var CIDADE = aluno.cidade;
            var ENDERECO = aluno.endereco;
            var EMAIL = aluno.email;
            var TELEFONE = aluno.telefone;

            $('#Id').val(ID);
            $('#Nome').val(NOME);
            $('#CPF').val(CPF); mascaraCPF();
            $('#Matricula').val(MATRICULA);
            $('#Nacionalidade').val(NACIONALIDADE);
            $('#CEP').val(CEP); mascaraCEP();
            $('#Estado').val(ESTADO);
            $('#Cidade').val(CIDADE);
            $('#Endereco').val(ENDERECO);
            $('#Email').val(EMAIL);
            $('#Telefone').val(TELEFONE); mascaraTEL();

        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}


