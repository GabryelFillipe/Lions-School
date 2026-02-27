import { getAllCourses, getAllStudents, getStudentById, getStudentsByCourse } from "../js/api.js"

const STUDENT_MODEL = expect.objectContaining({
id: expect.any(Number),
nome: expect.any(String),
foto: expect.any(String),
curso_id: expect.any(Number),
desempenho: expect.any(Array)
})

const COURSE_MODEL = expect.objectContaining({
id: expect.any(Number),
sigla: expect.any(String),
nome: expect.any(String)
})

describe("Testes da API Lions School", () => {

test("Deve retornar um aluno específico com a estrutura correta", async () => {
    const idValido = '1'
    const resultado = await getStudentById(idValido)
    
    expect(resultado).toEqual(STUDENT_MODEL)
})

test("Deve retornar array vazio ao buscar aluno inexistente ou nulo", async () => {
    const resultado = await getStudentById(null)
    expect(resultado).toEqual([])
})

test("Deve retornar uma lista de todos os alunos com a estrutura correta", async () => {
    const resultado = await getAllStudents()
    
    expect(resultado).toEqual(expect.arrayContaining([STUDENT_MODEL]))
})

test("Deve retornar uma lista de alunos de um curso específico", async () => {
    const idCursoValido = 1
    const resultado = await getStudentsByCourse(idCursoValido)
    
    expect(resultado).toEqual(expect.arrayContaining([STUDENT_MODEL]))
})

test("Deve retornar uma lista de todos os cursos com a estrutura correta", async () => {
    const resultado = await getAllCourses()
    
    expect(resultado).toEqual(expect.arrayContaining([COURSE_MODEL]))
})
})