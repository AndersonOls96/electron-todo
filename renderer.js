let tarefas = []

async function carregarTarefas() {
    tarefas = await window.electronAPI.carregarTarefas()
    renderizarTarefas()
}


async function salvarTarefas(){
    await window.electronAPI.salvarTarefas(tarefas)
}


function adicionarTarefa(){
    const input = document.getElementById('novaTarefa')
    const texto = input.value.trim()

    if (texto === '') return

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    }

    tarefas.push(novaTarefa)
    input.value = ''

    salvarTarefas()
    renderizarTarefas()
}

function renderizarTarefas(){
    const lista = document.getElementById('listaTarefas')
    const contador = document.getElementById('contador')

    lista.innerHTML = ''

    tarefas.forEach(tarefa =>{
        const li = document.createElement('li')
        li.className = tarefa.concluida ? 'concluida' : ''

        li.innerHTML = `
            <input type="checkbox" ${tarefa.concluida ? 'checked' : ''}
                onchange="toogleTarefa(${tarefa.id})">
            <span>${tarefa.texto}</span>
            <button>Excluir</button>
        
        `

        lista.appendChild(li)
    })

    const total = tarefas.length
    contador.textContent = `${total} tarefas`
}

document.getElementById('btnAdicionar').addEventListener('click', adicionarTarefa)

document.getElementById('novaTarefa').addEventListener('keypress', 
    (e) =>{
        if(e.key === 'Enter') adicionarTarefa()
    }
)

carregarTarefas()