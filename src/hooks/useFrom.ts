/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-09 09:41:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-09 09:53:50
 * @Description : from 操作符 -- 转换一切数据
 */
import { Observable } from 'rxjs'

export function useFrom() {
  const source$ = Observable.from([1, 2, 3, 4, 5])
  source$.subscribe(value => console.log(value))
  const source$$ = Observable.from('hello')
  source$$.subscribe(value => console.log(value))
  const resolvedPromise = Promise.resolve(1)
  const source$$$ = Observable.from(resolvedPromise)
  source$$$.subscribe(value => console.log(value))
  const source$$$$ = Observable.fromPromise(new Promise(resolve => resolve(1)))
  source$$$$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('complete'),
  })
  const source$$$$$ = Observable.fromPromise(
    new Promise((resolve, reject) => reject(new Error('error')))
  )
  source$$$$$.subscribe({
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('complete'),
  })
}
