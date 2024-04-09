/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 10:51:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 11:01:46
 * @Description :
 */
import { Observable } from 'rxjs'
import { onMounted } from 'vue'

export function useAjax() {
  onMounted(() => {
    const btn = document.querySelector('#star-btn')
    const source$ = Observable.fromEvent(btn, 'click')
    source$.subscribe(updateStar)
  })
  function updateStar() {
    // star.textContent = '⭐️'
    const ajax$ = Observable.ajax('https://api.github.com/repos/vuejs/vue', {
      responseType: 'json',
    })
    ajax$.subscribe({
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
  }
}
