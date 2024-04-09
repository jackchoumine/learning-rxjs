/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 11:08:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 11:48:55
 * @Description :
 */
import { Observable } from 'rxjs'
export function useRepeatWhen() {
  const ajax$ = Observable.ajax('https://api.github.com/repos/vuejs/vue', {
    responseType: 'json',
  })
  const repeatWhen$ = ajax$.repeatWhen(notify)
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
  function notify(notifier$) {
    console.log('notify')
    return notifier$.delay(2000)
    // return Observable.interval(2000)
  }
}
