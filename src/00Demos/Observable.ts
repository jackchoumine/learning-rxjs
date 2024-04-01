/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-01 17:37:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-01 17:46:48
 * @Description :
 */
class Observable {
  private observers: any = []
  constructor() {
    this.observers = []
  }
  on(f: any) {
    this.observers.push(f)
  }
  off(f: any) {
    this.observers = this.observers.filter((subscriber: any) => subscriber !== f)
  }
  emit(data: any) {
    this.observers.forEach((observer: any) => observer(data))
  }
}

export const observable = new Observable()
