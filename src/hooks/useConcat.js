/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-10 09:46:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-10 11:39:28
 * @Description : 合并操作符
 */
import { Observable } from 'rxjs'
export function useConcat() {
  //   const source1$ = Observable.interval(1000)
  const source1$ = Observable.of(1, 2, 3)
  const source2$ = Observable.of(4, 5, 6)
  const concated$ = source1$.concat(source2$)
  concated$.subscribe(console.log)
}
export function useMerge() {
  const click$ = Observable.fromEvent(document, 'click')
  const touchend$ = Observable.fromEvent(document, 'touchend')
  Observable.merge(click$, touchend$).subscribe(e => console.log(e.type))
}

export function useZip() {
  //    0    1    2    3 ...
  const source1$ = Observable.interval(4000)
  //     0     1     2     3 ...
  const source2$ = Observable.interval(5000)
  const zipped$ = source1$.combineLatest(source2$)
  //第5秒 [0,0] 第9秒[1,0] 第10秒[1,1] 第14秒[2,1] 第15秒[2,2]
  zipped$.subscribe(console.log)
}
