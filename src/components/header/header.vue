<template>
  <div>
    <div id="header">
      <div class="header-wrap">
        <div class="avatar">
          <img :src="seller.avatar" alt>
        </div>
        <div class="header-content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="descripticon">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="number">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="bulletin" @click="showDetail">
        <span class="icon"></span>
        <span class="text">{{seller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt>
      </div>
      <!-- 商家详情页 -->
      <transition name="fade">
        <div class="detail" v-show="isShow">
          <div class="mask">
            <!-- 蒙板 -->
          </div>
          <div class="detail-wrap">
            <div class="title">{{seller.name}}</div>
            <!-- <div class="star"></div> -->
            <!-- 五星级组件 -->
            <div class="star">
              <star :score = "seller.score" size = "48"></star>
            </div>
            <div class="info">
              <div class="info-title">
                <span class="line"></span>
                <span class="text">优惠信息</span>
                <span class="line"></span>
              </div>
              <ul class="info-list" v-if="seller.supports">
                <li v-for="(support,index) in seller.supports" :key="index">
                  <span class="icon" :class="classMap[support.type]"></span>
                  <span class="description">{{support.description}}</span>
                </li>
              </ul>
            </div>
            <div class="detail-bulletin">
              <div class="bulletin-title">
                <span class="line"></span>
                <span class="text">商家公告</span>
                <span class="line"></span>
              </div>
              <p>{{seller.bulletin}}</p>
            </div>
            <div class="close">
              <span class="icon-close" @click="hideDetail"></span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import star from "../star/star.vue";
export default {
  components:{
    star,
  },
  props: ["seller"],
  data() {
    return {
      classMap: [],
      isShow: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.isShow = !this.isShow;
    },
    hideDetail() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../common/css/mixin.scss";
// less
// stylus
$classMap: decrease, discount, special, invoice, guarantee;
$bgImgUrl: img/decrease_1, img/discount_1, img/special_1, img/invoice_1,
  img/guarantee_1;

#header {
  position: relative;
  overflow: hidden;
}
.header-wrap {
  background-color: rgba(7, 17, 27, 0.5);
  position: relative;
  color: #fff;
  padding: 24px 12px 18px 24px;
}
.avatar {
  vertical-align: top;
}
.avatar,
.header-content {
  display: inline-block;
}
.header-content {
  margin-left: 16px;
}
.avatar img {
  width: 64px;
  height: 64px;
  border-radius: 2px;
}
.title {
  margin-top: 2px;
  margin-bottom: 8px;
}
.title .brand {
  display: inline-block;
  width: 30px;
  height: 18px;
  @include bgimg(img/brand);
  background-size: 30px 18px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.title .name {
  margin-left: 6px;
  font-weight: bold;
  line-height: 18px;
}
.descripticon {
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
  margin-bottom: 10px;
}
.support .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  @include bgimg(img/decrease_1);
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.support .decrease {
  @include bgimg(img/decrease_1);
}
.support .discount {
  @include bgimg(img/discount_3);
}
.support .special {
  @include bgimg(img/special_1);
}
.support .invoice {
  @include bgimg(img/invoice_3);
}
.support .guarantee {
  @include bgimg(img/guarantee_1);
}
.support {
  line-height: 12px;
}
.support .text {
  margin-left: 4px;
  font-size: 10px;
  font-weight: 200;
  line-height: 12px;
}
.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 7px 8px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.2);
}
.support-count .icon-keyboard_arrow_right {
  margin-left: 2px;
  display: inline-block;
  vertical-align: middle;
}
.support-count .number {
  font-size: 10px;
  line-height: 12px;
  font-weight: 200;
}
.bulletin {
  padding: 12px;
  font-weight: 200;
  font-size: 10px;
  overflow: hidden;
  /* 文字超出 省略号显示 */
  text-overflow: ellipsis;
  /* 文字是否换行 nowrap 不换行 wrap 换行 */
  white-space: nowrap;
  background-color: rgba(7, 17, 27, 0.6);
  color: rgba(255, 255, 255);
}
.bulletin .icon {
  display: inline-block;
  width: 22px;
  height: 12px;
  @include bgimg(img/bulletin);
  background-repeat: no-repeat;
  background-size: 22px 12px;
  vertical-align: middle;
}
.bulletin .text {
  margin-left: 4px;
  font-size: 10px;
  font-weight: 200;
  vertical-align: middle;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;
  /* 滤镜:高斯模糊 */
  filter: blur(10px);
}
.background img {
  width: 100%;
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  color: rgba(255, 255, 255);
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.8);
    z-index: -1;
  }
  .detail-wrap {
    padding: 64px 36px 32px;
    .title {
      text-align: center;
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .star {
      text-align: center;
      height: 24px;
    }
    .info {
      .info-title {
        text-align: center;
        margin-top: 28px;
        margin-bottom: 24px;
        .line {
          display: inline-block;
          width: 111.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          vertical-align: middle;
        }
        .text {
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          margin: 0 12px;
        }
      }
      .info-list {
        padding: 0 28px;
        li {
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
          margin-left: 12px;
          margin-bottom: 12px;
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            vertical-align: middle;
            @for $i from 1 through 5 {
              &.#{nth($classMap,$i)} {
                @include bgimg(nth($bgImgUrl, $i));
              }
            }
          }
          .description {
            font-size: 12px;
            font-weight: 200;
            line-height: 12px;
            margin-left: 6px;
            vertical-align: middle;
          }
        }
      }
    }
    .detail-bulletin {
      .bulletin-title {
        text-align: center;
        margin-top: 28px;
        margin-bottom: 24px;
        .line {
          display: inline-block;
          width: 111.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          vertical-align: middle;
        }
        .text {
          font-size: 14px;
          font-weight: 700;
          line-height: 14px;
          margin: 0 12px;
        }
      }
      p {
        padding: 0 28px;
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
      }
    }
    .close {
      position: absolute;
      left: 50%;
      bottom: 32px;
      margin: -16px;
      font-size: 32px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>