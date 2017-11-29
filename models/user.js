var query = require('../lib/sql');

module.exports = {
    getAll:function(){
        return new Promise(function(resolve,reject){
            query('SELECT * FROM user',function(err,val,fields){
                if(err){
                    reject(err);
                }else{
                    resolve({users:val,fields:fields})
                }               
            })
        })
       
    }
}
