'use strict'

export async function getAllStudents() {

    const url = `https://lion-school-phbo.onrender.com/alunos`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Erro ao buscar estudantes: ${response.statusText}`)
        }
        const dados = await response.json()
        return dados || []
    } catch (error) {
        return []
    }

}

export async function getStudentById(id) {

    const url = `https://lion-school-phbo.onrender.com/alunos/${id}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Erro ao buscar estudante: ${response.statusText}`)
        }
        const dados = await response.json()
        return dados || []
    } catch (error) {
        return []
    }

}
export async function getAllCourses() {

    const url = `https://lion-school-phbo.onrender.com/cursos`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Erro ao buscar cursos: ${response.statusText}`)
        }
        const dados = await response.json()
        return dados || []
    } catch (error) {

        return []
    }

}

export async function getStudentsByCourse(idCurso) {

    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${idCurso}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos do curso: ${response.statusText}`)
        }
        const dados = await response.json()
        return dados || []
    } catch (error) {

        return []
    }

}
