<script setup>
import { Search } from "@element-plus/icons-vue"
import { ref } from "vue"
import { debounce } from "lodash-es"
const inputMsg = ref("")
const isShow = ref(false)
const searchHistory = ref([
  {
    name: "中国平安",
    code: "601318"
  }
])
const searchHotlist = ref([
  {
    name: "中国平安",
    code: "601318"
  }
])
const handleSearch = debounce(() => {
  console.log(inputMsg.value)
}, 500)
const handleClick = (item) => {
  inputMsg.value = item.code
  handleSearch()
}
</script>

<template>
  <div class="search">
    <el-input
      size="large"
      :prefix-icon="Search"
      placeholder="搜索研报、资讯或观点"
      v-model="inputMsg"
      @focus="isShow = true"
      @blur="isShow = false"
    ></el-input>
    <div class="search-dropdown" v-show="isShow">
      <div class="search-hot">
        <p>大家都在搜：</p>
        <ul class="search-hot-list">
          <li v-for="(item, i) in searchHotlist" :key="i" @mousedown="handleClick(item)" class="tag-li">
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="search-his">
        <p>历史搜索：</p>
        <ul class="search-his-list">
          <li v-for="(item, i) in searchHistory" :key="i" @mousedown="handleClick(item)" class="tag-li">
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  margin-right: 20px;
  position: relative;
  font-size: 14px;
  color: #81848a;
  :deep(.el-input__inner) {
    width: 300px;
    border: none;
  }
  .search-dropdown {
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(6, 53, 132, 0.05);
    border-radius: 10px;
    width: 466px;
    position: absolute;
    right: 0;
    padding: 16px;
    top: 48px;
    right: -74px;
  }
  .tag-li {
    height: 28px;
    line-height: 28px;
    background: #f1f3f7;
    border-radius: 4px;
    color: #1f263e;
    margin: 0 8px 8px 0;
    padding: 0 12px;
    cursor: pointer;
    &:hover {
      background: #f0f6fe;
      color: #0d64f4;
    }
  }
  .search-hot-list {
    display: flex;
    flex-wrap: wrap;
    padding: 12px 0 8px 0;
  }
  .search-his-list {
    display: flex;
    flex-wrap: wrap;
    padding: 12px 0 8px 0;
  }
}
</style>
