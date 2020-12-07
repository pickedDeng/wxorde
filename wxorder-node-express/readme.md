## 初始化数据库
```
部门表
npx sequelize model:generate --name Dept --attributes deptName:string,faid:string,remark:string,status:integer

工单类型
npx sequelize model:generate --name OrderType --attributes typeName:string,traffId:integer,status:integer

客户单位
npx sequelize model:generate --name Customer --attributes  name:string,status:integer

员工表
npx sequelize model:generate --name Staff --attributes  username:string,password:string,openId:string,deptId:integer,status:integer

客户表
npx sequelize model:generate --name SubmitPerson --attributes  wechatName:string,phone:string,customerId:integer,status:integer

工单表
npx sequelize model:generate --name Order --attributes  submitPeople:string,orderType:string,customerName:string,finishTime:string,level:string,needText:string,currentHandleId:integer,needSource:string,status:integer

工单处理流程
npx sequelize model:generate --name HandleHistory --attributes orderId:integer,sendPeople:string,besendPeople:string,sendType:string
```