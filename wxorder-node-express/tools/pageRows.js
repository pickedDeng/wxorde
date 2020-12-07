class PageRows {
    constructor(req){
        this.req = req;
    }
    returnPageAndRows(){
        const {page,rows} = this.req.query;
        return {page,rows}
    }
}

module.exports = PageRows;