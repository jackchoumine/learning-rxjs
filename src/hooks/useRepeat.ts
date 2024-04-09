/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 09:26:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 11:18:14
 * @Description :
 */
import { Observable } from 'rxjs'

export function useRepeat() {
  const source$ = Observable.of(1, 2, 3)
  const repeated$ = source$.repeat(2)
  repeated$.subscribe({
    next: val => console.log(val),
  })
  // source$.subscribe({
  //   next: val => console.log(val),
  // })
  // source$.subscribe({
  //   next: val => console.log(val),
  // })
}

export function useRepeat2() {
  const source$ = Observable.create(ob => {
    console.log('on subscribe')
    setTimeout(() => ob.next(1), 1000)
    setTimeout(() => ob.next(2), 2000)
    setTimeout(() => ob.next(3), 3000)
    setTimeout(() => ob.complete(4), 4000)
    return {
      unsubscribe: () => {
        console.log('unsubscribe')
      },
    }
  })
  const repeated$ = source$.repeat(2)
  repeated$.subscribe({
    next: val => console.log(val),
    complete: () => console.log('complete'),
  })
}
