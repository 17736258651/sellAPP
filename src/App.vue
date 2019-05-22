<template>
  <div id="app">
    <header>
      <myHeader :seller="seller"></myHeader>
    </header>
    <div class="tab">
      <ul>
        <li>
          <router-link to="/goods">商品</router-link>
        </li>
        <li>
          <router-link to="/ratings">评价</router-link>
        </li>
        <li>
          <router-link to="/seller">商家</router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import myHeader from "./components/header/header.vue";
import urlParse from "./common/js/util.js";
urlParse();
export default {
  components: {
    myHeader
  },
  data() {
    return {
      seller: {
        id: (() => {
          return urlParse().id;
        })()
      }
    };
  },
  created() {
    this.$axios.get("/api/seller").then(res => {
      // this.seller = res.data.seller;
      this.seller = Object.assign(res.data.seller, this.seller);
      // console.log(this.seller)
    });
  }
};
</script>
 
<style lang="scss">
@import url(common/css/reset.css);
@import url(common/css/style.css);

.tab {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  ul {
    display: flex;
    height: 40px;
    font-size: 14px;
    line-height: 14px;
    align-items: center;
    li {
      flex: auto;
      text-align: center;
      line-height: 14px;
      a {
        color: rgb(77, 85, 93);
        text-decoration: none;
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>