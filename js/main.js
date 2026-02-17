'use strict'

'use strict'

import { getAllCourses } from './api.js'

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

const createCourseCard = (curso) => {
    const botao = document.createElement('button')
    
    const estilo = mapaCursos[curso.sigla] || mapaCursos['DS']
    
    botao.classList.add(estilo.classe)
    
    const icone = document.createElement('i')
    icone.classList.add('fa-solid', estilo.icone)
    
    const titulo = document.createElement('h1')
    titulo.textContent = curso.sigla
    
    botao.append(icone, titulo)

    botao.addEventListener('click', () => {
        loadStudentPage(curso.sigla)
    })

    return botao
}

const loadCourses = async () => {
    const container = document.getElementById('container-cursos')
    
    if (!container) return 

    const cursos = await getAllCourses()

    const cards = cursos.map(createCourseCard)
    container.replaceChildren(...cards)
}

const loadStudentPage = (siglaCurso) => {
    console.log(`O usuário clicou no curso: ${siglaCurso}`)
}

loadCourses()

