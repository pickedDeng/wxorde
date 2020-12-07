/**
 * @author pickeddeng
 * @summary  工单类型 
 *
 * 
 */
// 
const Models = require("../db/models");
const OrderTypeModel = Models.OrderType;
const staffHandle = require("./staff");

const orderTypeHandle = {
    async addOrupdate(data) {
        let res = null;
        try {
            if (!data.id) {
                //新增 
                res = await OrderTypeModel.create(data);
            } else {
                // 修改
                res = await OrderTypeModel.update(data, {
                    where: {
                        id: data.id
                    }
                })
            }
            return res;
        } catch (error) {
            console.log(error)
        }
    },
    async getList() {
        return await OrderTypeModel.findAll();
    },
    async findOpenIdByName(typeName) {
        const res = await OrderTypeModel.findOne({
            attributes: ["traffId", "typeName"],
            where: {
                typeName,
                status: 0
            }
        })
        if (res) {
            console.log(res)
            const openId = await staffHandle.getOpenIdByStaffId(res.dataValues.traffId)
            console.log(openId)
            return openId.openId
        } else {
            return false
        }

    },
    async findstaffIdByTypeName(name) {
        const res = await OrderTypeModel.findOne({
            attributes: ["id", "traffId"],
            where: {
                typeName: name
            }
        })
        return res
    },
    async findIsManage(staffId){
        const res = await OrderTypeModel.findOne({
            where:{
                traffId:staffId
            }
        })
        return res
    }
}

module.exports = orderTypeHandle;