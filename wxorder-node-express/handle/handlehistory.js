/**
 * 
 * @author pickeddeng
 *  工单历史记录
 * 
 */

const Models = require("../db/models/index");

const historyOpModel = Models.HandleHistory;


const historyHandle = {
    // 添加历史记录
    async addHistory(data) {
        const res = historyOpModel.create(data);
        return res
    },
    async getOrderHistory(orderId) {
        const res = historyOpModel.findAll({
            where: {
                orderId
            },
            order: [["createdAt"]]
        })
        return res
    }
}

module.exports = historyHandle;