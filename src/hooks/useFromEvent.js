/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 10:01:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 10:38:42
 * @Description :
 */
import { Observable } from 'rxjs'
export function useFromEvent() {
  const source$ = Observable.fromEvent(document, 'mousemove')
  insertMouseTips()
  // source$.subscribe({
  //   next: updateMousePosition,
  //   error: error => console.log(error),
  //   complete: () => console.log('complete'),
  // })
  source$.subscribe(updateMousePosition)
  function insertMouseTips() {
    const tips = document.createElement('div')
    tips.id = 'mouse-tips'
    tips.style.width = '-100px'
    tips.style.height = '30px'
    tips.style.position = 'fixed'
    tips.style.top = '100px'
    tips.style.left = '10px'
    tips.style.background = 'rgba(0,0,0,0.2)'
    const span = document.createElement('span')
    span.textContent = 'x: 0, y: 0'
    tips.appendChild(span)
    document.body.appendChild(tips)
    return tips
  }
  function updateMousePosition(event) {
    const tips = document.getElementById('mouse-tips')
    const { pageX, pageY } = event
    tips.style.top = `${pageY + 10}px`
    tips.style.left = `${pageX + 10}px`
    tips.querySelector('span').textContent = `x: ${pageX}, y: ${pageY}`
  }
}
