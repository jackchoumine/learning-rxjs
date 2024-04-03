import { range } from 'rxjs/observable/range'

export function useRange() {
  const source$ = range(1, 5)
  source$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('complete'),
  })
}
