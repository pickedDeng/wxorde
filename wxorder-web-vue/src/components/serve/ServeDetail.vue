<template>
  <div class="det_con" v-if="orderOBJ">
    <div class="det_hea">
      <img
        src="../../assets/serve/jiantou.png"
        alt=""
        srcset=""
        @click="$router.go(-1)"
      />
      <p>新增需求</p>
    </div>
    <div class="det_cad">
      <div class="cad_hea">
        <p style="color: #747474">类型：{{ orderOBJ.orderType }}</p>
        <span v-if="orderOBJ.handleState == 0">已提交</span>
        <span v-if="orderOBJ.handleState == 1" color="#666">已派发</span>
        <span v-if="orderOBJ.handleState == 2" color="#45a208">已完成</span>
        <span v-if="orderOBJ.handleState == 3" color="#e92322">已结单</span>
      </div>
      <p style="color: #8c8c8c">提交人：{{ orderOBJ.submitPeople }}</p>
      <p style="color: #8c8c8c">创建时间：{{ orderOBJ.createdAt }}</p>
      <p style="color: #007acc" v-if="orderOBJ.finishTime">
        完成时间：{{ orderOBJ.finishTime }}
      </p>
      <p>{{ orderOBJ.needText }}</p>
      <div>
        <van-grid :column-num="2">
          <van-grid-item
            v-for="(item, index) in orderOBJ.needSource"
            :key="index"
          >
            <van-image
              v-if="
                item.indexOf('jpg') > 0 ||
                item.indexOf('jpeg') > 0 ||
                item.indexOf('png') > 0
              "
              @click="lookBig(item)"
              :src="item"
            />
            <br v-if="item.indexOf('mp4') > 0" />
            <video
              v-if="item.indexOf('mp4') > 0"
              controls
              style="width: 100%; max-height: 120px"
              :src="item"
            ></video>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="btn_wra">
      <van-button
        class="btn_aut"
        color="#3591FE"
        :loading="btnLoading"
        loading-type="spinner"
        @click="form_show = true"
        >派单</van-button
      >
    </div>
    <div class="btn_wra">
      <van-button
        class="btn_aut"
        type="primary"
        color="#027FFF"
        loading-type="spinner"
        @click="finishedIt"
        >完成</van-button
      >
    </div>

    <!-- 派单弹窗 -->
    <van-overlay :show="form_show" @click="form_show = false">
      <div class="cad_wra" @click.stop>
        <div class="pop_cad">
          <van-popover
            v-model="showPopover"
            :actions="actions"
            @select="onSelect"
            class="search_input"
          >
            <template #reference>
              <van-field
                v-model="value"
                label="派发："
                placeholder="输入搜索"
                @focus="getStaffList()"
                @input="getStaffList()"
              />
            </template>
          </van-popover>

          <van-field
            readonly
            clickable
            name="calendar"
            :value="finishedTime"
            label="截止日期："
            placeholder="设定截止日期"
            @click="showCalendar = true"
          />
          <van-calendar v-model="showCalendar" @confirm="onConfirm" />
          <div class="pop_btn">
            <van-button
              class="btn_itm"
              type="default"
              color="#EDEBEB"
              @click="form_show = false"
              >取消</van-button
            >
            <van-button
              class="btn_itm"
              type="primary"
              color="#027FFF"
              :loading="btnLoading"
              loading-type="spinner"
              @click="sendOrder"
              >确定</van-button
            >
          </div>
        </div>
      </div>
    </van-overlay>

    <!-- 成功的弹窗 -->
    <van-overlay v-show="success_show">
      <div class="wrapper" @click.stop>
        <div class="success_block">
          <img
            class="success_head"
            src="../../assets/serve/successPop.png"
            alt
          />
          <p>派单成功</p>
          <span>已成功派单，微信工单已成功通知</span>
          <button @click="success_show = false">确认</button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      btnLoading: false,
      success_show: false,
      form_show: false, // 派单弹窗
      minDate: new Date(),
      //   maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      orderOBJ: null,
      finishedTime: null,
      showCalendar: false,
      value: null,
      currentSelect: null,
      showPopover: false,
      actions: [],
    };
  },
  created() {
    this.getOrderDetail()
    // try {
    //   const orderId = location.href.split("?")[2].split("=")[1];
    //   this.getOrderDetail(orderId);
    // } catch (error) {
    //   console.log(error);
    // }
  },
  methods: {
    finishedIt() {
      this.$dialog
        .confirm({
          title: "完成工单",
          message: "该工单是否已确认完成?",
        })
        .then(() => {
          const data = {
            id: this.orderOBJ.id,
            handleState: 2, //完成状态
          };
          this.$http.post(`order/manage`, data).then((res) => {
            if (res.data.code === 10000) {
              this.Toast.success("操作完成");
              this.getOrderDetail();
            } else {
              this.Toast(res.data.msg);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    sendOrder() {
      // 派发工单
      if (!this.currentSelect || !this.finishedTime) {
        this.Toast("请检查信息填写");
      } else {
        const name = JSON.parse(localStorage.staffInfo).username;
        const data = {
          id: this.orderOBJ.id,
          currentHandleId: this.currentSelect.id,
        };
        this.$http
          .post(`order/sendTo?name=${name}&operateType=派发`, data)
          .then((res) => {
            if (res.data.code === 10000) {
              this.Toast.success("操作成功");
            } else {
              this.Toast(res.data.msg);
            }
            this.form_show = false;
          });
      }
    },
    onSelect(action) {
      this.value = action.text;
      this.currentSelect = action;
    },
    // 获取员工列表
    getStaffList() {
      if (this.form_show) {
        this.showPopover = true;
        this.$http
          .get(`staff/list?pid=1&psize=10&username=${this.value}`)
          .then((res) => {
            if (res.data.code === 10000) {
              const data = res.data.data.rows;
              const arr = [];
              if (data.length > 0) {
                this.staffList = data;
                data.forEach((value) => {
                  arr.push({
                    text: value.username,
                    id: value.id,
                  });
                });
              }
              this.actions = arr;
            }
          });
      }
    },
    onConfirm(date) {
      this.finishedTime = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    lookBig(src) {
      const arr = [];
      arr.push(src);
      ImagePreview(arr);
    },
    onChange(index) {
      this.index = index;
    },
    getOrderDetail() {
      try {
        const orderId = location.href.split("?")[1].split("=")[1];
        this.$http.get(`order/orderDetail?id=${orderId}`).then((res) => {
          if (res.data.code === 10000) {
            this.orderOBJ = res.data.data;
            this.orderOBJ.needSource = JSON.parse(this.orderOBJ.needSource);
            // console.log(this.orderOBJ);
          } else {
            this.Toast(res.data.msg);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.pop_cad .van-cell__value {
  text-align: left;
}
</style>
<style lang="less" scoped>
.det_con {
  background: #f0f1f6;
  .van-grid-item__content {
    min-height: 180px;
  }
  .det_hea {
    height: 143px;
    background: url("../../assets/serve/hisbg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    img {
      position: absolute;
      top: 36px;
      left: 10px;
      width: 22px;
      height: 22px;
    }
    p {
      position: absolute;
      top: 36px;
      left: 50%;
      transform: translate(-50%);
      color: #fff;
      font-size: 19px;
    }
  }
  .det_cad {
    width: 85vw;
    height: 300px;
    padding: 10px 15px;
    margin: -50px auto 0;
    background: #fff;
    border-radius: 8px;
    position: relative;
    // z-index: 3;
    .cad_hea {
      display: flex;
      justify-content: space-between;
      span {
        color: #3697fa;
      }
    }
    p {
      margin: 3px 0;
    }
  }
  .btn_wra {
    width: 80vw;
    height: 30px;
    margin: 10px auto;
    .btn_aut {
      width: 100%;
      height: 100%;
      font-size: 16px;
    }
  }
  .cad_wra {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .pop_cad {
      padding: 10vw 5vw;
      border-radius: 10px;
      background: #fff;
      .pop_btn {
        display: flex;
        width: 70vw;
        margin: 0 auto;
        padding-top: 10vw;
      }
      .btn_itm {
        flex: 1;
      }
    }
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
        border-radius: 6px;
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