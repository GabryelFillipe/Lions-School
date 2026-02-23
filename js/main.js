import { getAllCourses, getStudentsByCourse } from './api.js'
import { createComponent, renderScreen } from './gerenciador-telas.js'

const mapaCursos = {
    'DS': {
        icone: 'fa-code',
        classe: 'ds'
    },
    'RDS': {
        icone: 'fa-network-wired',
        classe: 'redes'
    }
}

const nomeCursos = {
    'DS': 'Desenvolvimento de sistemas',
    'RDS': 'Redes de computadores'
}

const createStudentCard = (aluno) => {
    const statusClass = aluno.status && aluno.status.toLowerCase() === 'finalizado' ? 'bg-amarelo' : 'bg-azul'
    
    const card = createComponent('div', ['card-aluno', statusClass])
    const img = createComponent('img', ['foto-aluno'], '', { src: aluno.foto })
    const nome = createComponent('h2', ['nome-aluno'], aluno.nome)
    
    card.append(img, nome)
    
    return card
}

const createStudentPage = async (siglaCurso) => {
    const main = createComponent('main', ['main-alunos'])

    const subHeader = createComponent('div', ['sub-header'])

    const filtroContainer = createComponent('div', ['filtro-container'])
    const selectStatus = createComponent('select', ['filtro-status'])
    
    const opTodos = createComponent('option', [], 'Status', { value: 'Todos' })
    const opFinalizado = createComponent('option', [], 'Finalizado', { value: 'Finalizado' })
    const opCursando = createComponent('option', [], 'Cursando', { value: 'Cursando' })
    
    selectStatus.append(opTodos, opFinalizado, opCursando)
    filtroContainer.append( selectStatus)

    const legendaContainer = createComponent('div', ['legenda-container'])
    const tituloLegenda = createComponent('span', [], 'LEGENDA')
    const iconeCursando = createComponent('div', ['icone-cursando'])
    const textoCursando = createComponent('span', [], 'Cursando')
    const iconeFinalizado = createComponent('div', ['icone-finalizado'])
    const textoFinalizado = createComponent('span', [], 'Finalizado')

    legendaContainer.append(tituloLegenda, iconeCursando, textoCursando, iconeFinalizado, textoFinalizado)
    subHeader.append(filtroContainer, legendaContainer)

    const tituloCompleto = nomeCursos[siglaCurso.toUpperCase()] || siglaCurso
    const tituloCurso = createComponent('h1', ['titulo-curso'], tituloCompleto)

    const containerAlunos = createComponent('div', ['container-alunos'])

    let id = 0

    if (siglaCurso === 'DS'){
        id = 1
    } else {
        id = 2
    }

    const todosAlunos = await getStudentsByCourse(id)

    const renderCards = (filtro) => {
        containerAlunos.replaceChildren()
        
        const alunosFiltrados = filtro === 'Todos' 
            ? todosAlunos 
            : todosAlunos.filter(a => a.status && a.status.toLowerCase() === filtro.toLowerCase())

        alunosFiltrados.forEach(aluno => {
            const card = createStudentCard(aluno)
            containerAlunos.appendChild(card)
        })
    }

    renderCards('Todos')

    selectStatus.addEventListener('change', (evento) => {
        renderCards(evento.target.value)
    })

    main.append(subHeader, tituloCurso, containerAlunos)

    return main
}

const loadStudentPage = async (siglaCurso) => {
    const header = createHeader('turma')
    const main = await createStudentPage(siglaCurso)
    
    renderScreen(header, main)
}

const createCourseCard = (curso) => {
    const estilo = mapaCursos[curso.sigla] || mapaCursos['DS']
    
    const botao = createComponent('button', [estilo.classe])
    const icone = createComponent('i', ['fa-solid', estilo.icone])
    const titulo = createComponent('h1', [], curso.sigla)
    
    botao.append(icone, titulo)

    botao.addEventListener('click', () => {
        loadStudentPage(curso.sigla)
    })

    return botao
}

const createHeader = (page) => {
    const header = createComponent('header')

    const containerLogo = createComponent('div', ['container-logo'])
    const logo = createComponent('img', [], '', { src: './img/logo-image.png' })
    const titulo = createComponent('h3', [], 'Lion <br>School')

    containerLogo.append(logo, titulo)

    const btnSair = createComponent('button', ['btn-header'])
    btnSair.addEventListener('click', () => {
        if (page.toLowerCase() !== 'main') {
            iniciarApp()
        }
    })

    const iconSair = createComponent('img', [], '', { src: './img/Vector.png' })
    
    const textoBotao = page.toLowerCase() === 'main' ? 'Sair' : 'Voltar'
    const textSair = createComponent('p', [], textoBotao)

    btnSair.append(iconSair, textSair)
    header.append(containerLogo, btnSair)

    return header
}

const createMainPage = async () => {
    const main = createComponent('main', ['main-home'])

    const infoCentral = createComponent('div', ['informacao-central'])
    const titulo = createComponent('h1', [], 'Escolha um <span class="destaque">curso</span> <br> para gerenciar')
    const pcImg = createComponent('img', [], '', { src: './img/devices.png' })

    infoCentral.append(titulo, pcImg)

    const estudante = createComponent('img', ['estudante'], '', { src: './img/estudante.png' })
    const containerCursos = createComponent('div', ['cursos'])

    const cursos = await getAllCourses()
    
    cursos.forEach(curso => {
        const card = createCourseCard(curso)
        containerCursos.appendChild(card)
    })

    main.append(infoCentral, estudante, containerCursos)

    return main
}

const iniciarApp = async () => {
    const header = createHeader('main')
    const main = await createMainPage()
    
    renderScreen(header, main)
}

iniciarApp()