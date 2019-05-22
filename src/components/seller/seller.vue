<<template>
    <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div @click="toggleFavorite" class="favorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="(item,index) in seller.supports" :key="index" class="support-item">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="120" alt>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>>
<script>
import BScroll from "better-scroll";
import star from "../star/star.vue";
import split from "../split/split.vue";
import { saveToLocall, loadFromLocal } from "../../common/js/store.js";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, "favorite", false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏";
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.seller, {
    //     click: true
    //   });
    // });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  // seller页 刷新会执行watch，从其他页切至 seller页 会执行mounted
  watch: {
    "seller"() {
      this.$nextTick(() => {
        this._initPics();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px";
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true, // 横向滚动
          eventPassthrough: "vertical" // 在这个区块忽略竖向滚动
        });
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocall(this.seller.id, "favorite", this.favorite);
    }
  },
  components: {
    star,
    split
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../common/css/mixin.scss";

.seller {
  position: absolute;
  top: 187px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;
      .star {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
      .text {
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
        line-height: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border: 0;
        }
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 8px;
      top: 18px;
      width: 50px;
      text-align: center;
      font-size: 0;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
  }
  .supports {
    .support-item {
      padding: 16px 12px;
      font-size: 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child {
        border-bottom: 0;
      }
    }
    .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: top;
      margin-right: 6px;
      background-size: 16px 16px;
      background-repeat: no-repeat;
      @include bgimg(img/decrease_4);

      &.decrease {
        @include bgimg(img/decrease_4);
      }
      &.discount {
        @include bgimg(img/discount_4);
      }
      &.guarantee {
        @include bgimg(img/guarantee_4);
      }
      &.invoice {
        @include bgimg(img/invoice_4);
      }
      &.special {
        @include bgimg(img/special_4);
      }
    }
    .text {
      line-height: 16px;
      font-size: 12px;
      color: rgb(7, 17, 27);
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          img {
            width: 120px;
            height: 90px;
          }
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      font-size: 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
