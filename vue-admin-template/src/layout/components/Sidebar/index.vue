<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sub-menu v-for="(item,index) in menuList" :key="index" :param="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Logo from './Logo'
import variables from '@/styles/variables.scss'
import subMenu from './subMenu.vue'

export default {
  components: { Logo, subMenu },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'menuList'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {},
  mounted() {
    this.load()
  },
  methods: {
    ...mapActions({
      load: 'user/loadMenuList'
    })
  }
}
</script>
<style>
</style>
