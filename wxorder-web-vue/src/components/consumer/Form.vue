<template>
  <div class="for_con">
    <div class="tab">
      <div class="head_wrapper">
        <span
          @click="active = true"
          :class="{ head_font: true, head_border: active }"
          >工单</span
        >
        <span
          @click="active = false"
          :class="{ head_font: true, head_border: !active }"
          >我的</span
        >
      </div>
    </div>

    <!-- 工单提交 -->
    <div v-show="active" class="for_cad">
      <div class="for_typ">
        <span>工单类型：</span>
        <van-radio-group
          style="margin-left: 6px"
          v-model="radio"
          direction="horizontal"
          v-if="typeList.length > 0"
        >
          <van-radio
            :name="item.typeName"
            v-for="item in typeList"
            :key="item.id"
            >软件</van-radio
          >
        </van-radio-group>
      </div>
      <div class="for_txt">
        <div>具体需求</div>
        <textarea
          rows="6"
          v-model="needs"
          type="text"
          placeholder="请输入具体需求"
        />
      </div>
      <div class="for_upl">
        <div>
          <span>附件</span>
          <span class="for_spn">上传图片或视频</span>
        </div>
        <van-uploader
          v-model="fileList"
          deletable
          max-count="5"
          :after-read="afterRead"
        />
      </div>
    </div>

    <!-- 我的工单 -->
    <div v-show="!active" class="his_cad" v-if="userOrderObj">
      <div class="his_had">
        <div class="his_dat">
          <span>累计提交</span>
          <span v-if="userOrderObj">{{ userOrderObj.count }}</span>
        </div>
        <div class="his_lin"></div>
        <div class="his_dat">
          <span>已完结</span>
          <span v-if="userOrderObj">{{ userOrderObj.finishedNumber }}</span>
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="ser_cad"
          v-for="item in orderList"
          :key="item.id"
          @click="lookDetail(item.id)"
        >
          <img src="../../assets/serve/soft.png" alt="" />
          <div class="ser_det">
            <span>{{ item.submitPeople }}</span>
            <span>类型：{{ item.orderType }}</span>
            <span>{{ item.createdAt }}</span>
            <span>具体需求: {{ item.needText }}</span>
          </div>
          <div class="ser_sta" v-if="item.handleState == 0">已提交</div>
          <div class="ingClass" v-if="item.handleState == 1">派单中...</div>
          <div class="finishedClass" v-if="item.handleState == 2">已完成</div>
          <div class="overClass" v-if="item.handleState == 3">已结单</div>
        </div>
      </van-list>
    </div>

    <!-- 提交按钮 -->
    <div v-show="active" class="btn_wra">
      <van-button
        class="btn_aut"
        type="primary"
        color="#3591FE"
        :loading="btnLoading"
        loading-type="spinner"
        @click="submitOrderClick"
        >提交</van-button
      >
    </div>
    <div v-show="active" class="btn_tip">
      提交工单后，工单结算通过公众号及时通知您
    </div>

    <!-- 表单提交成功的弹窗 -->
    <van-overlay :show="success_show">
      <div class="wrapper" @click.stop>
        <div class="success_block">
          <img
            class="success_head"
            src="../../assets/consumer/success.png"
            alt
          />
          <p>提交成功</p>
          <span>结单时，将使用微信公众号通知到您</span>
          <button @click="success_show = false">确认</button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userOrderObj: null,
      active: true,
      radio: null,
      btnLoading: false,
      success_show: false,
      typeList: [],
      fileList: [],
      orderList: [],
      needs: "",
      currentPage: 1, //当前页
      loading: false,
      finished: false,
      list: [],
    };
  },
  created() {
    this.getOrderTypeList();
  },
  mounted() {
    this.getUserInfo(localStorage.submitId);
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.currentPage++;
      this.getUserOrderList();
    },
    lookDetail(id) {
      this.$router.push(`/clientDetail?id=${id}`);
    },
    // 获取用户工单
    getUserOrderList() {
      const id = localStorage.submitId;
      this.$http
        .get(`order/orderList?pid=${this.currentPage}&psize=5&id=${id}`)
        .then((res) => {
          if (res.data.code === 10000) {
            this.userOrderObj = res.data.data;
            this.orderList = this.orderList.concat(this.userOrderObj.rows);
            if (this.orderList.length === this.userOrderObj.count) {
              this.finished = true;
            }
            this.loading = false;
          }
        });
    },
    // 文件上传
    afterRead(file) {
      // FormData 参数
      const formData = new FormData();
      formData.append("file", file.file);
      this.$http
        .post("sysconfig/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.code === 10000) {
            if (this.fileList.length > 0) {
              this.fileList[this.fileList.length - 1].path = res.data.data.path;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取类型
    getOrderTypeList() {
      this.$http
        .get("ordertype/list")
        .then((res) => {
          if (res.data.code === 10000) {
            this.typeList = res.data.data;
            if (this.typeList.length > 0) {
              this.radio = this.typeList[0].typeName;
            }
          } else {
            this.Toast("获取类型失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 工单提交
    submitOrderClick() {
      if (!this.needs) {
        this.Toast("请输入您的具体需求");
      } else {
        this.btnLoading = true;
        const pathArr = [];
        this.fileList.forEach((value) => {
          pathArr.push(value.path);
          // 存入附件图片
        });
        const userInfo = JSON.parse(localStorage.userInfo);
        const data = {
          submitId: userInfo.id,
          submitPeople: userInfo.wechatName,
          orderType: this.radio,
          customerName: userInfo.customerName,
          needText: this.needs,
          needSource: JSON.stringify(pathArr),
        };
        this.$http.post("order/manage", data).then((res) => {
          if (res.data.code === 10000) {
            this.clearForm();
          }
          this.Toast(res.data.msg);
        });
        this.btnLoading = false;
      }
    },
    //根据id获取用户信息
    getUserInfo(id) {
      this.$http.get(`submitperson/userInfo?id=${id}`).then((res) => {
        if (res.data.code === 10000) {
          localStorage.userInfo = JSON.stringify(res.data.data);
        } else {
          this.Toast("获取用户信息（getUserInfo）失败");
        }
      });
    },

    // 清空表单
    clearForm() {
      this.needs = "";
      this.fileList = [];
    },
  },
  watch: {
    active(value) {
      if (!value) {
        this.currentPage = 1;
        this.orderList = [];
        this.finished = false;
        this.getUserOrderList();
      }
    },
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      const { backFlag } = to.query;
      if (backFlag) {
        vm.active = true;
      } else {
        vm.active = false;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.for_con {
  background: #f0f1f6;
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f1f6;
    font-size: 16px;
    padding: 20px 0;
    .head_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      width: 54vw;
      border-radius: 35px;
      .head_font {
        width: 100%;
        height: 36px;
        display: inline-block;
        border-radius: 18px;
        text-align: center;
        line-height: 36px;
      }
      .head_border {
        border: 1px solid#027FFF;
        background: #027fff;
        color: #fff;
      }
    }
    div {
      width: 100%;
      height: 100%;
    }
  }
  .for_cad {
    width: 90vw;
    background: #fff;
    margin: 20px auto 0;
    border-radius: 20px 20px 10px 10px;
    padding: 2vw 0;
    .for_typ {
      display: flex;
      padding: 1vw 0 3vw 3vw;
      border-bottom: 3px solid #f0f1f6;
    }
    .for_txt {
      padding-left: 3vw;
      border-bottom: 3px solid #f0f1f6;
      textarea {
        border: none;
        width: 100%;
        margin-top: 20px;
        resize: none;
        // height: 50px;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #ccc !important;
      }
    }

    .for_upl {
      padding: 3vw 0 6vw 3vw;
      .for_spn {
        color: #ccc;
        margin-left: 6px;
      }
    }
  }
  .his_cad {
    // position: absolute;
    // bottom: 70px;
    // left: 50%;
    width: 90vw;
    margin: 0 auto;
    // transform: translate(-50%);
  }
  .his_had {
    background: #fff;
    padding: 6px 0;
    display: flex;
    justify-content: space-around;
    .his_dat {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-child(1) {
          color: #b3b3b3;
        }
        &:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .his_lin {
      border-right: 1px solid #d7d7d7;
    }
  }
  .ser_cad {
    padding: 4vw 3vw;
    display: flex;
    justify-content: space-between;
    background: #fff;
    img {
      width: 33px;
      height: 33px;
    }
    margin: 10px 0;
    .ser_det {
      display: flex;
      flex-direction: column;
      span {
        width: 56vw;
        color: #8c8c8c;
        margin-left: 1vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .ser_sta {
      color: #66aeff;
    }
    .ingClass {
      color: orange;
    }
    .finishedClass {
      color: #0bd4a1;
    }
    .overClass {
      color: #e92322;
    }
  }
  .btn_wra {
    width: 80vw;
    height: 30px;
    margin: 40px auto 0;
    .btn_aut {
      width: 100%;
      font-size: 16px;
    }
  }
  .btn_tip {
    color: #a3a3a3;
    margin-top: 30px;
    text-align: center;
  }
  .wrapper {
    .success_block {
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      background: #fff;
      width: 60vw;
      margin: 50% auto 0;
      border-radius: 10px;
      padding-bottom: 10vw;
      .success_head {
        width: 100px;
        height: 100px;
        margin-top: -30px;
      }
      p {
        font-size: 17px;
        margin-bottom: 1vw;
      }
      span {
        width: 131px;
        font-size: 4vw;
        color: #9a9a9a;
        text-align: center;
      }
      button {
        border-radius: 36px;
        border: none;
        width: 40vw;
        height: 10vw;
        line-height: 10vw;
        text-align: center;
        background: #027fff;
        color: #fff;
        font-size: 16px;
        margin: 5vw 0;
      }
    }
  }
}
</style>