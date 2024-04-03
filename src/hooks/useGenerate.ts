import { generate } from 'rxjs/observable/generate'

export function useGenerate() {
  const source$ = generate(
    1,
    val => val < 10, // 终止条件
    val => val + 2, // 步长
    val => val * val // 产生的结果
  )
  source$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('complete'),
  })
}

export function useRange2(start: number = 1, count: number) {
  const source$ = generate(
    start,
    val => val < start + count, // 终止条件
    val => val + 1, // 改变条件
    val => val // 产生的结果
  )
  source$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('complete'),
  })
}
