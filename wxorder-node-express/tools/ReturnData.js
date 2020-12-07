/**
 * @author pickeddeng
 * 
 * be used to res.send 
 * 
 * 
 */
class ReturnData {
    constructor(res){
        this.res = res;
    }
    success(data,rdobj){

        this.res.json({
            code:rdobj? rdobj.code || 10000:10000,
            data:data || null,
            msg:rdobj? rdobj.msg || "操作成功":"操作成功",
            status:true
        })
    }
    fail(rdobj,data){
        this.res.json({
            code:rdobj? rdobj.code || 10001:10001,
            data:data || null,
            msg:rdobj? rdobj.msg || "操作失败":"操作失败",
            status:false
        })
    }
}

module.exports = ReturnData;