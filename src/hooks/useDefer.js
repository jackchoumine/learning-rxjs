/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 14:30:40
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 14:46:10
 * @Description : defer 操作符
 */
import { Observable } from 'rxjs'
import { onMounted } from 'vue'

export function useDefer() {
  const createAjax = () => {
    console.log('createAjax')
    return Observable.ajax('https://api.github.com/repos/vuejs/vue', {
      responseType: 'json',
    })
  }
  const defer$ = Observable.defer(createAjax)
  const repeatWhen$ = defer$.repeatWhen(notify)
  onMounted(() => {
    console.log('onMounted')
    repeatWhen$.subscribe({
      next: res => {
        console.log(res.response.stargazers_count)
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      },
    })
  })
  function notify(notifier$) {
    console.log('notify')
    return notifier$.delay(3000)
  }
}
