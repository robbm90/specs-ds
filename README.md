# 🚀 Meu fluxo padrão de Git com feature branches

# Sempre começo na main e garanto que ela está atualizada
git checkout main
git pull origin main

# Crio uma nova branch para a feature que vou trabalhar
git checkout -b feat/nome-da-feature

# Faço as alterações no projeto normalmente...

# Depois adiciono tudo que foi alterado
git add .

# E faço um commit com uma mensagem clara do que foi feito
git commit -m "feat: adiciona nome da feature"

# Agora envio a nova branch pro repositório remoto
git push -u origin feat/nome-da-feature

# Quando a feature estiver pronta, volto pra main
git checkout main

# Atualizo a main só pra garantir que estou com tudo em dia
git pull origin main

# Faço o merge da minha branch de feature na main
git merge feat/nome-da-feature

# Subo a main atualizada pro GitHub
git push origin main

# Por fim, limpo a branch que já foi usada (opcional)
git branch -d feat/nome-da-feature
git push origin --delete feat/nome-da-feature
