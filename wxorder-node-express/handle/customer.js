
/**
 * 
 * @author pickeddeng
 * 
 * staff 处理层面
 */
const Sequelize = require("sequelize");
const Models = require("../db/models/index");
const customerModel = Models.Customer;
const Op = Sequelize.Op;

const customerHandle = {
    async addOrUpdate(data) {
        let res = null;
        if (!data.id) {
            // 新增
            res = await customerModel.create(data);
        } else {
            // 修改
            res = await customerModel.update(data, {
                where: {
                    id: data.id
                }
            })
        }
        return res;
    },
    async getList(name){
        const res = await customerModel.findAll({
            order:[["id","desc"]],
            where:{
                name:{
                    [Op.like]:`%${name}%`
                }
            }
        });
        return res
    }
}
module.exports = customerHandle