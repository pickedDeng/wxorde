/**
 * @author pickeddeng
 * @summary  系统配置model 
 *
 * 
 */
// 
const Models = require("../db/models");
const sysconfigModel = Models.sysconfig;

const sysConfigHandle = {
    async addOrUpdate(data) {
        if (!data.id) {
            // 新建
            const res = await sysconfigModel.create(data);
            return res
        } else {
            const res = await sysconfigModel.update(data, {
                where: {
                    id: data.id
                }
            })
            return res
        }
    },
    async getContentByName(name) {
        const res = await sysconfigModel.findOne({
            where: {
                name
            }
        })
        return res.dataValues.content;
    }
}

module.exports = sysConfigHandle;