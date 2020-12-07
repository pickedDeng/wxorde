const express = require("express");
const router = express.Router();
const ReturnData = require("../tools/ReturnData")
const sysconfigHandle = require("../handle/sysconfig");
const sysConfigHandle = require("../handle/sysconfig");

const formidable = require('formidable');
//新增 修改
router.post('/manage', async (req, res, next) => {
    try {
        const RD = new ReturnData(res);
        const data = await sysconfigHandle.addOrUpdate(req.body);
        if (data) {
            RD.success(data)
        } else {
            RD.fail()
        }
    } catch (error) {
        next(error)
    }
})

//根据名称获取content
router.get('/getValue', async (req, res, next) => {
    const RD = new ReturnData(res);
    try {
        const { name } = req.query
        const data = await sysConfigHandle.getContentByName(name);
        if (data) {
            RD.success(data);
        } else {
            RD.fail()
        }

    } catch (error) {
        next(error)
    }
})
// 图片上传
router.post('/upload', async function (req, res, next) {
    try {
        switch (req.method) {
            case 'OPTIONS':
                res.statusCode = 200;
                res.end();
                break;
            case 'POST':
                upload(req, res);
                break;
        }
    } catch (error) {
        next(error)
    }
});
async function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('请求错误,请使用multipart/form-data格式');
        return;
    }

    var form = new formidable.IncomingForm();
    // 设置上传图片保存文件路径
    form.uploadDir = './res';
    form.keepExtensions = true;
    let fullFilePath = null;
    const nodePrefix = await sysConfigHandle.getContentByName("NODEPREFIX");
    form.on('file', (filename, file) => {
        fullFilePath = nodePrefix + file.path.replace("res\\","")
        // console.log({ name: 'file', key: filename, value: file })
    });
    form.on('end', () => {
        const RD = new ReturnData(res);
        RD.success({
            path: fullFilePath
        })
    })
    form.parse(req);
}

function isFormData(req) {
    let type = req.headers['content-type'] || '';
    return type.includes('multipart/form-data');
}


module.exports = router