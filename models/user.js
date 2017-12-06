var query = require('../lib/sql');

var $sql = {
    queryAll: 'select * from user',
    insert:'INSERT INTO user(name) VALUES(?)',
    // insert:'INSERT INTO user(id,name) VALUES(?,?)', 查询时传递[0,1]
    queryById: 'select * from user where id=?',
    delete: 'delete from user where id=?',
    update:'update user set name=? where id=?',
};

module.exports = {    
    // ejs
    getAll:function(){
        return new Promise(function(resolve,reject){
            query($sql.queryAll,null,function(err,val,fields){
                if(err){
                   reject(err);
                }else{
                    resolve(val);
                }
            })
        })
    },

    // 接口
    queryAll:function(req,res,next){        
        query($sql.queryAll,null,function(err,val,fields){
            if(err){
                res.json({code:'0',message: err.message,result:null});
            }else{
                res.json({code:'1',message:'操作成功',result:val});
            }
        })    
    },
    add:function(req,res,next){     
        let name = req.query.name;   
        query($sql.insert,name,function(err,val,fields){
            if(err){
                res.json({code:'0',message: err.message,result:null});
            }else{
                res.json({code:'1',message:'添加成功',result:null});
            }
        })
    },
    queryById:function(req,res,next){
        let id = req.query.id;
        query($sql.queryById,id,function(err,val,fields){
            if(err){
                res.json({code:'0',message: err.message,result:null});
            }else{
                res.json({code:'1',message:'查找成功',result:val});
            }
        })
    },
    delete:function(req,res,next){
        let id = req.query.id;
        query($sql.delete,id,function(err,val,fields){
            if(err){
                res.json({code:'0',message: err.message,result:null});
            }else{
                res.json({code:'1',message:'删除成功',result:null});
            }
        })
    },
    update:function(req,res,next){
        let id = req.body.id;
        let name = req.body.name;
        query($sql.update,[name,id],function(err,val,fields){
            if(err){
                res.json({code:'0',message: err.message,result:null});
            }else{
                res.json({code:'1',message:'更新成功',result:null});
            }
        })
    }
}
