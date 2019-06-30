# Api do projeto uptimemonitor
Api para gerenciar todos processos

# Configuracoes
O arquivo localSettings deve ser criado em config/environment, este é um arquivo usado para setar as configurações 
que são exclusivas para o desenvolvedor no ambiente local

Estrutura do localSettings.js
--------------------------------
const config = {
    Suas configuracoes
}

module.exports = config;
---------------------------------
Depois de criar o arquivo, rode um npm install e node app.js