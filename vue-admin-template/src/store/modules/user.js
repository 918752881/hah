import { login, logout, getInfo, loadMenu } from '@/api/user'
import { getToken, setToken, removeToken, setStorage } from '@/utils/auth'
import { resetRouter } from '@/router'
import { menuList } from '@/services/default'
import * as types from '../types'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  menuList: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  [types.LOAD_MENU](state, menu) {
    // console.log(menu)
    state.menuList = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, roleId } = data
        setStorage('roleId', roleId)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        resetRouter()
        resolve()
        window.localStorage.removeItem('roleId')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // 加载左侧菜单
  loadMenuList({ commit }) {
    loadMenu().then(res => {
      commit(types.LOAD_MENU, menuList)
    }).catch(() => {
      commit(types.LOAD_MENU, menuList)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

