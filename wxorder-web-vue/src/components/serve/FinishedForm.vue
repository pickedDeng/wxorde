<template>
  <div class="fin_con">
    <div class="fin_hea">
      <img
        src="../../assets/serve/jiantouTwo.png"
        alt=""
        @click="$router.go(-1)"
      />
    </div>
    <p class="hea_fon">已完成的工单</p>
    <div class="hea_rad">
      <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
    </div>

    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-checkbox
        v-for="item in endedOrderList"
        :key="item.id"
        :name="item.id"
      >
        <div class="ser_cad" @click="goToDetail">
          <img src="../../assets/serve/soft.png" alt="" srcset="" />
          <div class="ser_det">
            <span>{{ item.submitPeople }}</span>
            <span>类型：{{ item.orderType }}</span>
            <span>{{ item.updatedAt }}</span>
            <span>具体需求: {{ item.needText }}</span>
          </div>
          <div class="ser_sta" v-if="item.handleState == 3">已完成</div>
        </div>
      </van-checkbox>
    </van-checkbox-group>

    <div class="btn_wra">
      <van-button
        class="btn_aut"
        type="primary"
        color="#027FFF"
        :loading="btnLoading"
        loading-type="spinner"
        @click="singEnd"
        >结单</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      result: [],
      btnLoading: false,
      endedOrderList: [],
    };
  },
  created() {
    this.getEndedOrder();
  },
  methods: {
    // 结单
    singEnd() {
      if (this.result.length) {
        const data = {
          ids: JSON.stringify(this.result),
        };
        this.$http.post(`order/signend`, data).then((res) => {
          if (res.data.code === 10000) {
            this.Toast.success("操作成功");
            this.getEndedOrder();
          } else {
            this.Toast(res.data.msg);
          }
        });
      }
    },
    getEndedOrder() {
      const id = JSON.parse(localStorage.staffInfo).id;
      this.$http.get(`order/endedOrder?id=${id}`).then((res) => {
        if (res.data.code === 10000) {
          this.endedOrderList = res.data.data.rows;
        } else {
          this.Toast(res.data.msg);
        }
      });
    },
    selectAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },

    // 进入详情页
    goToDetail() {
      this.$router.push({ path: "/serveDetail" });
    },
  },
};
</script>

<style lang="less" scoped>
.fin_con {
  background: #f0f1f6;
  padding: 0 3vw;
  .fin_hea {
    position: relative;
    height: 30px;
    margin: 20px 0;
    img {
      position: absolute;
      top: 0;
      left: -5px;
      width: 30px;
    }
  }
  .hea_fon {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .hea_rad {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
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
        font-size: 13px;
        width: 53vw;
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
  }
  .btn_wra {
    position: absolute;
    width: 80vw;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    .btn_aut {
      width: 100%;
      height: 100%;
      font-size: 16px;
    }
  }
}
</style>