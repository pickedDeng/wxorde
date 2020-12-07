### 写在前面
工单是用来记录客户提交需求，改动说明等做记录。该项目起因是公司内的工单无法在各个状态通知到相应的人，仅仅是提交表单的操作，所以从产品原型、前端开发、后端开发、数据库设计均由本人完成，时间短完成的比较粗糙，若需要二次开发等操作不清楚项目结构的可添加博主微信,微信搜索：deng9466  备注工单即可。 
### 演示地址
[用户端:](http://wxorder.fst1994.cn/) http://wxorder.fst1994.cn/
###### 微信扫码：用户端
![微信测试号图片](https://github.com/pickedDeng/wxorde/blob/master/images/%E5%AE%A2%E6%88%B7%E5%85%A5%E5%8F%A3.png?raw=true)

[未认证员工端](http://wxorder.fst1994.cn/#/staffregister)：http://wxorder.fst1994.cn/#/staffregister

###### 微信扫码：员工端
![员工端](https://github.com/pickedDeng/wxorde/blob/master/images/%E5%AE%A2%E6%88%B7%E5%85%A5%E5%8F%A3.png?raw=true)

### 产品原型地址（墨刀）：
[墨刀原型链接：](https://org.modao.cc/app/ab747e9ee843f69cb5ef7ff09b398ee7c7782b90?simulator_type=device&sticky)https://org.modao.cc/app/ab747e9ee843f69cb5ef7ff09b398ee7c7782b90?simulator_type=device&sticky

### 部分截图
#### 用户端
###### 用户提交：
![用户提交](https://github.com/pickedDeng/wxorde/blob/master/images/customer/submit-form.png?raw=true)
![用户提交](https://github.com/pickedDeng/wxorde/blob/master/images/customer/handlehis.png?raw=true)

#### 员工端
###### 工单提醒：
![](https://github.com/pickedDeng/wxorde/blob/master/images/staff/msg.png?raw=true)
###### 主界面：
![](https://github.com/pickedDeng/wxorde/blob/master/images/staff/waithandle.png?raw=true)


### 目录说明
```
wxorder-node-express     工单node服务后台代码
 - bin 启动文件(node服务端口：3001)
 - db  数据库连接
 - routes 路由
 - tools 函数工具
  -app.js 入口文件
wxorder-web-vue          工单显示前台界面
 -src 
  -- components 组件
  -- router  前端路由
  --main.js  
  
wx-order.mysql           数据库初始化文件(数据库名称wx-order)
```

### 技术栈
- vue
- vue-router
- axios
- express
- sequelize
- mysql
- 微信开发等

### 下载
```
git clone https://github.com/pickedDeng/textContent-comparison.git

```

### 安装
```
//安装依赖
cd wxorder-node-express
npm i 


cd wxorder-web-vue 
npm i 
```

### 运行
```
服务端：npm start    /默认启动：localhost:3001

vue前台: npn run serve      /默认启动:localhost:8080

```

### 开发测试
#### 先关注微信测试号（或者自己注册个微信测试号）


 ![微信测试号图片](https://github.com/pickedDeng/wxorde/blob/master/images/wx-test.png?raw=true)
 
 
 ### 工作流
 ##### 名词解释：
 ###### 用户：
 项目实际客户/提交bug的人
 ###### 员工：
 产品研发人员
 
 ###### 1用户提交工单->
 ###### 2工单类型管理员微信模板提醒->
 ###### 3员工端派发工单到具体人->
 ###### 4具体员工处理人可继续派发/完成该工单->
 ###### 5工单类型管理员结单->
 ###### 6微信模板提醒反馈到工单提交人
 
 ### 结尾 给个star 谢谢
 