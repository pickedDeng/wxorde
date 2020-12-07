/**
 * @author pickeddeng
 * @summary 部门处理中转 
 *
 * 
 */
// 
const Models = require("../db/models");
const deptModel = Models.Dept;

const deptHandle = {
    treeArr: [],
    finalArr: [],
    async addDept(data) {
        const res = await deptModel.create(data);
        return res
    },
    async updateDept(data) {
        console.log(data)
        const res = await deptModel.update(data, {

            where: {
                id: data.id
            }
        })
        return res
    },
    async getDeptByFaid(faid){
        const res = deptModel.findAll({
            where:{
                faid
            }
        })
        return res
    }


}
module.exports = deptHandle;