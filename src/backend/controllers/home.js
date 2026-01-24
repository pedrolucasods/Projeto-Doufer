class Homepage{
    home(req,res){
        try {
            return res.render('home',{stylesheet:'stylehome.css',script:'viewhome.js'})
        } catch (error) {
            res.status(500).send(`Erro ao carregar a tela inicial ${error}`)
        }
    }
}

module.exports = new Homepage()