const fn = (urls, maxNum) => {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    let res = []
    let index = 0 //写一个请求的下标
    let count = 0 //当前请求完成的数量
    async function request() {
      if (index === urls.length) {
        return
      }
      const i = index
      const url = urls[index]
      index++
      try {
        const resp = await fetch(url)
        res[i] = resp
      } catch (error) {
        res[i] = error
      } finally {
        if (++count === urls.length) {
          resolve(res)
        }
        request()
      }
    }
    const times = Math.min(maxNum, urls.length)
    for (let i = 0; i < times.length; i++) {
      request()
    }
  })
}
