class Helpers{
    eq(a,b){
        return a==b
    }
    ne(a,b){
        return a!=b
    }

    gt(a,b){
        return a > b
    }
    lt(a,b){
        return a < b
    }
    gte(a,b){
        return a >= b
    }
    lte(a,b){
        return a <= b
    }
    and(a,b){
        return a && b
    }
    or(a,b){
        return a || b
    }
    selected(a,b){
        return (a == b ? 'selected' : '')
    }

    json(contex){
        return JSON.stringify(context)
    }

    mostrar(valor){
        return valor?valor:"-"
    }

    data_brasileira(dataUsa){
        if(!dataUsa) return "-"
        let [year,month,day] = dataUsa.split('-')
        let dataBrail = `${day}/${month}/${year}`
        return dataBrail
    }

    telefone(telefone_grudado){
        let telefone_formatado = ''
        if(!telefone_grudado) return '-'
        if(telefone_grudado.length == 10){
            const t = telefone_grudado
            telefone_formatado = `(${t[0]}${t[1]}) ${t[2]}${t[3]}${t[4]}${t[5]}-${t[6]}${t[7]}${t[8]}${t[9]}`
        }else{
            const t = telefone_grudado
            telefone_formatado = `(${t[0]}${t[1]}) ${t[2]}${t[3]}${t[4]}${t[5]}${t[6]}-${t[7]}${t[8]}${t[9]}${t[10]}`
        }
        return telefone_formatado
    }

    subtrair(a,b){
        if(b>0){
            return  parseInt(a)-parseInt(b)
        }else{
            return a
        }
    }
}

const helpersInstance = new Helpers();

const objectHelper = {  // adicionado helpers para eq e outros
        eq: (a, b)=> helpersInstance.eq(a,b),
        ne: (a, b) => helpersInstance.ne(a, b),
        gt: (a, b) => helpersInstance.gt(a, b),
        lt: (a, b) => helpersInstance.lt(a, b),
        gte: (a, b) => helpersInstance.gte(a, b),
        lte: (a, b) => helpersInstance.lte(a, b),
        and: (a, b) => helpersInstance.and(a, b),
        or: (a, b) => helpersInstance.or(a, b),
        selected: (a, b) => helpersInstance.selected(a, b),
        json: (context) => helpersInstance.json(context),
        mostrar: (valor) => helpersInstance.mostrar(valor),
        data_brasileira: (dataUSA) => helpersInstance.data_brasileira(dataUSA),
        telefone:(telefone_grudado) => helpersInstance.telefone(telefone_grudado),
        subtrair: (a,b)=> helpersInstance.subtrair(a,b)
    }
module.exports = objectHelper