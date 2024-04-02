<script setup>
import { onMounted } from 'vue';
import $ from "jquery";
import Rx, { Observable, map } from "rxjs";
import DemoOne from './DemoOne.vue'
import DemoTwo from './DemoTwo.vue'
onMounted(() => {
    // jqTimeSense()
    rxTimeSense()
})

function jqTimeSense() {
    let startTime
    $('#hold-me').on('mousedown', function () {
        startTime = new Date().getTime()
    })
    $('#hold-me').on('mouseup', function () {
        if (!startTime) return
        let endTime = new Date().getTime()
        let time = endTime - startTime
        $('#hold-time').text(time)
        startTime = null

        $.ajax(`https://timing-sense-score-board.herokuapp.com/score/${time}`)
            .done(function (data) {
                $('#rank').text('你的排名: ' + data.rank + '名')
            })
            .fail(function () {
                $('#rank').text('获取排名失败')
            })
    })
}

function rxTimeSense() {
    const holdMeBtn = document.getElementById('hold-me')

    // 通过 Observable.fromEvent() 方法，我们可以将 DOM 事件转换为 Observable 对象
    // 流对象，通常以 $ 结尾，芬兰式命名
    const mouseDown$ = Rx.Observable.fromEvent(holdMeBtn, 'mousedown')
    const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')

    // 通过 mouseDown$ 和 mouseUp$ 两个流对象，我们可以计算出鼠标按下和抬起之间的时间差，holdTime$ 还是一种流对象
    const holdTime$ = mouseUp$
        .timestamp()
        .withLatestFrom(mouseDown$.timestamp(), (up, down) => up.timestamp - down.timestamp)

    // 流对象里“流淌”的是数据，subscribe() 方法用来订阅流对象，用来处理流对象中的数据
    holdTime$.subscribe(time => console.log(`hold time: ${time}ms`))
    holdTime$
        .flatMap(time =>
            Rx.Observable.ajax('https://time-sense-score-board.herokuapp.com/score/' + time)
        )
        .map(e => e.response)
        .subscribe(score => console.log(`score: ${score}`))

    // rx 中有一种特殊的对象：Observable，称为“流”或者数据流，它是一个可观察的对象，可以用来处理异步或者基于事件的程序。

    // jQuery 的实现，startTime 有被交叉访问，按下事件和抬起事件的事件回调相互关联，容易引发 bug
    // jQuery 的实现是系列指令组合完成功能

    // RxJS 的实现，通过数据流的方式，将按下事件和抬起事件分开处理，避免了变量交叉访问，代码更加清晰，易于维护
    // RxJS 的实现是一个一个的函数，每个函数只对输入的参数进行响应，然后返回结果
}
// source$ 是发布者 负责产生三个整数
const source$ = Observable.of(1, 2, 3, 'hello rxjs');
// 通过 subscribe 方法，建立发布者和观察者之间的订阅关系
// console.log 是观察者，负责输出整数
source$.subscribe(console.log);

const onSubscribe = ob => {
    let num = 10
    const timer = setInterval(() => {
        console.log('in onSubscribe', num)
        ob.next(num)
        num += 10
        // if (num > 30) {
        //     clearInterval(timer)
        // }
    }, 1000)
    return {
        unsubscribe() {
            clearInterval(timer)
        }

    }
}
const source$$ = new Observable(onSubscribe)
const observer = {
    next: console.log,
}
const map$ = source$$.map(x => x * 2)
const subscription = map$.subscribe(observer)
// 5秒后退订
setTimeout(() => {
    subscription.unsubscribe()
}, 5000)
</script>

<template>
  <div class="TimeSenseJQ">
    <div>测试你对时间的感觉.</div>
    <button id="hold-me">按住我一秒钟然后松手</button>
    <div>你的时间: <span id="hold-time"></span>毫秒</div>
    <div id="rank"></div>
  </div>
  <h2>发布-订阅模式</h2>
  <DemoOne />
  <DemoTwo />
</template>

<style scoped lang="scss">
.TimeSenseJQ {
    // scss code
}
</style>
