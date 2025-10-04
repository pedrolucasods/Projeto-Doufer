function validatename(input){
    if(input.trim() === '' || input.length <3){
        return false
    }
    return true
}

module.exports = {validatename}