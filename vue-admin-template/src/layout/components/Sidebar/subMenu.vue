<template>
  <el-submenu v-if="item.isShow && item.children.length>0" :index="item.href" class="el-menu-sub">
    <template slot="title"><i :class="item.icon" /><span slot="title">{{ item.name }}</span></template>
    <template v-for="child in item.children">
      <!--<SubMenu v-if="child.children && child.children.length>0" :param="child" :path="item.href"></SubMenu>-->
      <el-menu-item v-if="child.isShow" :key="child.href" :index="child.href"><i :class="child.icon" /><span slot="title">{{ child.name }}</span></el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item v-else-if="item.isShow" :index="item.href"><i :class="item.icon" /><span slot="title">{{ item.name }}</span></el-menu-item>
</template>
<script>
// import subMenu from './subMenu.vue'
export default {
  name: 'SubMenu',
  components: {
    // subMenu
  },
  props: {
    param: {
      type: Object,
      default: () => {}
    },
    path: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return { item: this.param }
  }
}
</script>
<style>

</style>
