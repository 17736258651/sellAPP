<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
          :class="{current:currentIndex === index}"
          @click="selectFood(index)"
        >
          <span class="text">
            <span v-show="item.type >=0 " class="icon" :class="classMap[item.type]"></span>
            <span class="title">{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-list foods-list-hook">
          <h2 class="title">{{item.name}}</h2>
          <div v-for="(food,ind) in item.foods" :key="ind" class="food-item">
            <div @click="detaile(food)">
              <div class="item-left">
                <img :src="food.icon">
              </div>
              <div class="item-right">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <p class="desc">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </p>
                <p class="price">
                  <span class="now">
                    <span>￥</span>
                    {{food.price}}
                  </span>
                  <span class="old" v-show="food.oldPrice">
                    <span>￥</span>
                    {{food.oldPrice}}
                  </span>
                </p>
              </div>
            </div>
            <div class="cart-control">
              <cartControl :food="food"></cartControl>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopcart
      :minPrice="seller.minPrice"
      :deliveryPrice="seller.deliveryPrice"
      :foodList="selectFoods"
      ref="shopCart"
    ></shopcart>
    <food :food="foodDetaile" ref="food"></food>
  </div>
</template>

<script>
import shopcart from "../shopcart/shopcart.vue";
import cartControl from "../cartControl/cartControl.vue";
import BScroll from "better-scroll";
import bus from "../../bus.js";
import food from "../food/food.vue";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcart,
    cartControl,
    food
  },
  data() {
    return {
      goods: [],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      HeightScroll: [],
      scrollY: 0,
      foodDetaile: {},
    };
  },
  mounted() {
    bus.$on("cart-add", target => {
      this._drop(target);
    });
  },
  created() {
    this.$axios
      .get("/api/goods")
      .then(res => {
        if (res.data.errno == 0) {
          this.goods = res.data.goods;
          this.$nextTick(() => {
            this._initScroll();
            this._calcHeight();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.HeightScroll.length; i++) {
        let height1 = this.HeightScroll[i];
        let height2 = this.HeightScroll[i + 1];
        if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if (this.goods) {
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
      }
      return foods;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.floor(pos.y));
      });
    },
    _calcHeight() {
      // 获取到所有商品分类的元素
      let foodList = this.$refs.foodsWrapper.querySelectorAll(
        ".foods-list-hook"
      );
      let height = 0;
      this.HeightScroll.push(height);
      for (var i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.HeightScroll.push(height);
      }
    },
    selectFood(index) {
      let foodList = this.$refs.foodsWrapper.querySelectorAll(
        ".foods-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _drop(target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target); // 父组件访问子组件的方式，调用子组件的方法，传值
      });
    },
    detaile(food) {
      this.$refs.food.show();
      this.foodDetaile = food;
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../common/css/mixin.scss";
.goods {
  display: flex;
  position: absolute;
  top: 188px;
  bottom: 48px;
  overflow: hidden;
  width: 100%;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        font-size: 0;
        &.current {
          margin-top: -1px;
          background-color: #fff;
          font-weight: 700;
          .text {
            border-bottom: none;
          }
        }
        .text {
          font-size: 12px;
          display: table-cell;
          vertical-align: middle;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            @include bgimg(img/decrease_3);
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: bottom;
            margin-right: 2px;
            &.decrease {
              @include bgimg(img/decrease_3);
            }
            &.discount {
              @include bgimg(img/discount_3);
            }
            &.special {
              @include bgimg(img/special_3);
            }
            &.invoice {
              @include bgimg(img/invoice_3);
            }
            &.guarantee {
              @include bgimg(img/guarantee_3);
            }
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .foods-list {
      .title {
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
      }
      .food-item {
        position: relative;
        margin: 18px 18px 0;
        padding-bottom: 18px;
        font-size: 0;
        border-bottom: 1px solid rgb(7, 17, 27, 0.1);
        div{
          display: flex;
        }
        &:last-child {
          border-bottom: 0;
        }
        .item-left {
          flex: 0 0 57px;
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
          margin-right: 10px;
          img {
            width: 57px;
            height: 57px;
            border-radius: 3px;
          }
        }
        .item-right {
          position: relative;
          flex: 1;
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
          .name {
            margin-top: 2px;
            font-size: 14px;
            left: 14px;
            color: rgb(7, 17, 27);
            font-weight: 700;
          }
          .desc {
            margin: 8px 0;
            font-size: 14px;
            line-height: 14px;
            color: rgb(147, 153, 159);
            .count {
              display: inline-block;
              margin-right: 12px;
            }
            .rating {
              display: inline-block;
            }
          }
          .price {
            .now {
              color: rgb(240, 20, 20);
              font-size: 14px;
              font-weight: 700;
              span {
                font-size: 10px;
                font-weight: normal;
              }
            }
            .old {
              font-size: 10px;
              font-weight: 700;
              text-decoration: line-through;

              span {
                font-size: 10px;
                font-weight: normal;
              }
            }
          }
        }
        .cart-control {
          position: absolute;
          right: 0;
          bottom: 10px;
        }
      }
    }
  }
}
</style>