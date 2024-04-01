/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-04-01 11:21:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-04-01 14:29:16
 * @Description : 时间感知 - jQuery 实现
 */
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

  $.ajax(`https://timing-sence-score-board.herokuapp.com/score/${time}`)
    .done(function (data) {
      $('#rank').text('你的排名: ' + data.rank + '名')
    })
    .fail(function () {
      $('#rank').text('获取排名失败')
    })
})
