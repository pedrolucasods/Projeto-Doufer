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
        subtrair: (a,b)=> helpersInstance.subtrair(a,b)
    }
module.exports = objectHelper