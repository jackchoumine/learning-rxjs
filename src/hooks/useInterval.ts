import { Observable } from 'rxjs'

export function useInterval() {
  const source$ = Observable.interval(1000)
  const map$ = source$.map(v => v + 1)
  map$.subscribe({
    next: val => {
      console.log(val)
    },
  })
}

export function useTimer() {
  const source$ = Observable.timer(2000, 1000)
  source$.subscribe({
    next: val => console.log(val),
    complete: () => console.log('complete'),
  })
}
