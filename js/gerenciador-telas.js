export const createComponent = (tag, classes = [], texto = '', atributos = {}) => {
    const elemento = document.createElement(tag)
    
    if (classes.length > 0) {
        elemento.classList.add(...classes)
    }
    
    if (texto) {
        if (texto.includes('<')) {
            elemento.innerHTML = texto
        } else {
            elemento.textContent = texto
        }
    }
    
    for (const [chave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(chave, valor)
    }
    
    return elemento
}

export const renderScreen = (newHeader, newMain) => {
    const oldHeader = document.querySelector('header')
    const oldMain = document.querySelector('main')
    
    if (oldHeader && newHeader) {
        oldHeader.replaceWith(newHeader)
    }
    
    if (oldMain && newMain) {
        oldMain.replaceWith(newMain)
    }
}