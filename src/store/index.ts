// index.ts 文件
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import State from './types'
// 定义类型InjectionKey。
// InjectionKey在将商店安装到Vue应用程序时提供类型。
// 将类型传递InjectionKey给useStore方法。
import { InjectionKey } from 'vue'
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('key')

// 创建store实例
export const store = createStore<State>({
  state() {
    //存放数据和data类似
    return {
      count: 0,
      foo: 'Hi'
    }
  },
  getters: {
     //相当于计算属性
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    //vuex中用于发起异步请求
  },
  modules: {
    //拆分模块
  }
})

// 定义自己的useStore组合式函数
export function useStore() {
  return baseUseStore(key)
}
