# 学习 rxjs 响应式编程

rxjs 是一个响应式编程库，让我们更容易地处理**异步操作**，rxjs 是 ReactiveX 的 js 实现。

## 函数式响应式编程的优点

- 数据流抽象了很多现实问题。
- 擅长处理异步操作。
- 把复杂问题分解程简单问题的组合。

### 数据流抽象了很多现实问题

DOM 事件、用户输入、HTTP 请求、定时器等等，都可以被抽象成数据流。就可以用同一套 API 来处理这些不同的输入。

### 擅长处理异步操作

对数据采用“推”的处理，当一个数据产生的时候，被推送给响应的处理函数，处理函数不必关心数据是同步的还是异步的，就把开发者从**命令式异步处理**的困扰中解放出来。

> 更好地处理异步操作，一直是 JavaScript 的难点。

### 把复杂问题分解程简单问题的组合

数据流可能包含复杂的功能，但是可分解成很多小的部分来实现，每个部分都是简单的功能，这样就可以更容易地理解和维护。

实现某一个小功能的函数就是操作符，通过操作符的组合，可以实现复杂的功能。

## 入门

### Observable 和 Observer

> rxjs 的运行就是 Observable 和 Observer 之间的互动关系。

`Observable` 可被观察者， `Observer` 观察者，它们之间通过 `subscribe` 方法建立订阅关系。

rxjs 中的数据流是由 `Observable` 对象来表示的， `Observable` 实现了两种设计模式：**观察者模式**和**迭代器模式**。

#### 观察者模式

解决为问题，在一个持续产生消息的系统中，如何分割功能，让不同的模块只处理一部分逻辑，实现功能和代码的解耦。

想象一个场景：到饭点了，你想找几个同事一起出去搓一顿。

方案 A：你在组里挨个问一遍，问了一大圈之后，找到了几个也正好想要出去吃的人。

方案 B：你在的群里发了条消息，问了一下谁想出去搓一顿的，然后同事 A/B/C 回复了你，说要一起出去吃。

显而易见，方案 B 才是一个比较省事的方案。在这个简单的场景方案中，你就扮演着一个发布者（Publisher）的角色，而你的所有同事，都以订阅者（Subscriber）的身份接收着你发布的消息。

> 观察者模式又叫发布订阅模式。

发布者（Publisher）和观察者（Observer）, 其中发布者只负责发布消息 -- 即通知所有观察者，观察者只负责订阅消息 -- 即处理消息。

实现一个发布订阅模式：

```js
class Observable {
  private observers = []
  constructor() {
    // 记录所有订阅者
    this.observers = []
  }
  on(f) {
    // 订阅消息
    this.observers.push(f)
  }
  off(f) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f)
  }
  emit(data) {
    // 发布消息，通知所有订阅者
    this.observers.forEach((observer) => observer(data))
  }
}

export const observable = new Observable()
```

使用：

`DemoOne.vue` 中发布消息

```html
<script setup>
import { observable } from './Observable'
function onClick() {
    observable.emit(1)
}
</script>

<template>
  <div class="DemoOne">
    <button @click="onClick">发送消息</button>
  </div>
</template>
```

`DemoTwo.vue` 中订阅消息

```html
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { observable } from './Observable'
const msg = ref(0)
onMounted(() => {
    observable.on(observer)
})
onUnmounted(() => {
    observable.un(observer)
})
function observer(data) {
    msg.value += data
}
</script>

<template>
  <div class="DemoOne">
    <p>{{ msg }}</p>
  </div>
</template>
```
`on` 方法用于订阅消息，使发布者和订阅者产生了关联。

```js
import {
    Observable
} from 'rxjs';
// source$ 是发布者 负责产生三个整数
const source$ = Observable.of(1, 2, 3);
// 通过 subscribe 方法，建立发布者和观察者之间的订阅关系
// console.log 是观察者，负责输出整数
source$.subscribe(console.log);
```

好处：两方都只专注一件事，且可任意组合，将复杂问题分解成三个问题。

1. 如何产生消息，这是发布者的责任。

2. 如何处理消息，这是观察者的责任。

3. 发布者和观察者之间的对应关系，即何时调用 subscribe。

#### 迭代器模式

迭代器模式提供一种方法**顺序访问**一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示，使用者不需要知道迭代器内部实现。

迭代器通常包含几个函数：

```js
getCurrent // 当前元素
next // 下一个元素
isDone // 是否迭代完成
const iterator = new Iterator();
while (!iterator.isDone()) {
    console.log(iterator.getCurrent());
    iterator.next();
}
```

rxjs 中的 observable 对象结合了观察者模式和迭代器模式，它不仅可以产生消息，还可以处理消息。

> observable = publisher + iterator， observable 对象，代表一段时间内发生的一系列事件(消息)。

```js
import {
    Observable
} from "rxjs"
// onSubscribe 是一个函数，负责产生消息，决定了 observable 对象的行为
const onSubscribe = ob => {
    ob.next(10)
    ob.next(20)
    ob.next(30)
}
// 1、创建一个 observable 对象，通过 onSubscribe 函数产生消息
const source$$ = new Observable(onSubscribe)
// 2、订阅者
const observer = {
    next: console.log,
}
// 3、订阅 source$$ 发布的消息
source$$.subscribe(observer)
```

在 RxJS 中，Observable 是一个特殊类，它接受一个处理 Observer 的函数，即该**函数的参数是订阅者**，而 Observer 就是一个普通的对象，没有什么神奇之处，对 Observer 对象的要求，它必须包含一个名为 next 的属性，这个属性的值是一个函数，用于接受发布者发布的消息。

实现一个观察者模式：

```js

```
