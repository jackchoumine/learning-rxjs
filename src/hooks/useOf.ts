import { of } from 'rxjs/observable/of'
export function useOf() {
  const source$ = of(1, 2, 3, 4, 5)
  source$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('complete'),
  })
  source$.subscribe(console.log)
}
