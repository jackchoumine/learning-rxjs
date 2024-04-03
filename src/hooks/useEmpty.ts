import { Observable } from 'rxjs'

export function useEmpty() {
  const source$ = Observable.empty()
  source$.subscribe({
    complete: () => console.log('complete'),
  })
}

export function useThrow() {
  const source$ = Observable.throw(new Error('error...'))
  source$.subscribe({
    error: e => console.log(e),
  })
}

export function useNever() {
  const source$ = Observable.never()
  source$.subscribe({
    next: val => console.log('next'),
  })
}
