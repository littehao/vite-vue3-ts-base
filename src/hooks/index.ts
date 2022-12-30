import { computed } from 'vue'
import {
  Computed,
  Mapper,
  MapperWithNamespace,
  useStore,
  mapActions,
  mapState,
  mapMutations,
  mapGetters,
  createNamespacedHelpers
} from 'vuex'

const useMapper = (
  mapper: any,
  mapFn: Mapper<Computed> & MapperWithNamespace<Computed>,
  mapName:
    | 'mapMutations'
    | 'mapGetters'
    | 'mapState'
    | 'mapActions'
    | undefined = undefined
) => {
  // 拿到store独享
  const store = useStore()
  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapFn(mapper)

  // 对数据进行转换
  const storeState:any = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    if ((mapName && mapName === 'mapMutations') || mapName === 'mapActions') {
      // storeState[fnKey] = fn
      storeState[fnKey] = computed(() => {
        return fn
      }).value
    } else {
      storeState[fnKey] = computed(fn)
    }
  })

  return storeState
}

const useActions = (moduleName: any, mapper = undefined) =>{
  const mapName = 'mapActions'
  let mapperFn = mapActions
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn, mapName)
}

const useState =(moduleName: any, mapper: any = undefined) => {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

const useMutations = (moduleName: any, mapper = undefined) => {
  const mapName = 'mapMutations'
  let mapperFn = mapMutations
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn, mapName)
}

const useGetters = (moduleName: any, mapper = undefined) => {
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }

  return useMapper(mapper, mapperFn)
}

export { useGetters, useState, useMutations, useActions }

