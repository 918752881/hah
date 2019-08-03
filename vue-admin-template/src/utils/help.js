export function timeSwitch(timestamp, state) {
  var data = new Date(timestamp)
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  var day = data.getDate()
  var h = data.getHours()
  var m = data.getMinutes()
  var s = data.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return state ? year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s : year + '-' + month + '-' + day
}
