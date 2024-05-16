const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const lista = ['Java', 'Kotlin', 'Android']
// Implementando Endpoint Read All (irá funcionar com GET)/ neste ponto pensar em qual será a entidade ex.personagem

// Função para exibir em um único endpoint de Read All toda a lista 
app.get('/personagem', function (req, res){
  // Função do 'filter.boolean' é para que os espaços quando deletar, não aparecer em vizualização como 'null' 
  res.send(lista.filter(Boolean))
})

// Implementando Endpoint Read By Id [Get](obter informação) /personagem/:id(os dois pontos id funcionam para dizer que é uma especificação direcionada )
app.get('/personagem/:id', function (req, res){
// função de requisição de parâmetro de rota id
const id = req.params.id

// Função para acessar o item da lista usando ID -1
const item = lista[id -1]

// Função para checar se o item obtido é existente, exibindo uma mensagem caso não esteja
if (!item) {
  return res.status(404).send('Item não encontrado. ')
}
  
// função para enviar um item como resposta
  res.send(item)
})

// Função para sinalizar para o express que está sendo utilizado o Json no body
app.use(express.json())

// Implementando Endpoint Creat [POST](criar informação) /personagem
app.post('/personagem', function (req, res){
 
// Função para acessar o Body da requisição através do req.body
const body = req.body

//  Função para adicionar um novo item na lista acessando a propriedade 'nome' no body
const novoItem = body.nome

// Função para checar se o 'nome' está no body, e não foi modificado
if (!novoItem) {
  return res.status(400).send('Corpo da requisição deve conter a propriedade `nome`.')
}
// Função para checar se o novoItem está na lista ou não, e para que não duplique 
if (lista.includes(novoItem)) {
  return res.status(409).send('Este item já existe na lista.')
}

// Adicionar na lista
lista.push(novoItem)

// Função para exibir uma mensagem de sucesso
  res.status(201).send('Item adicionado com sucesso: ' + novoItem)
})

// Implementando Endpoint Update [PUT](atualizar informação completa) /personagem/:id
app.put('/personagem/:id', function(req, res){

// Acessando o ID dos parâmetros de rota
const id = req.params.id

// Função para checar se o item do ID - 1 está na lista, exibindo uma mensagem caso não esteja
if (!lista[id - 1]) {
  return res.status(404).send('Item não encontrado. ')
}

// Função para acessar o Body da requisiçao
const body = req.body

// Função para acessar a propriedade 'nome' do body
const novoItem = body.nome

// Função para checar se o 'nome' está no body e não foi modificado.
if (!novoItem) {
  return res.status(400).send('Corpo da requisição deve conter a propriedade `nome`.')
}
// Função para checar se o novoItem está na lista ou não, e para que não duplique 
if (lista.includes(novoItem)) {
  return res.status(409).send('Este item já existe na lista.')
}

// Função para atualizar na lista novoItem pelo ID -1
lista[id - 1] = novoItem 
  
// Função para exibir a mensagem de sucesso
  res.send('Item atualizado com sucesso: ' + id + ' - ' + novoItem)
})

// Implementação do Endpoint Delete [DELETE] /personagem/:id
app.delete('/personagem/:id', function (req, res){

// Funçãp para acessar o parâmetro de rota
const id = req.params.id

// Função para checar se o item do ID - 1 está na lista, exibindo uma mensagem caso não esteja
if (!lista[id - 1]) {
  return res.status(404).send('Item não encontrado. ')
}

// remover o item da lista usando o ID -1
delete lista[id-1]

//Enviamos uma mensagem de sucesso
  res.send('Item removido con sucesso: ' + id)
})


app.listen(3000)