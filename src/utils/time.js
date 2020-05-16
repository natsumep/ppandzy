export function formatWeek(day) {
    const chinaWeek = ["一", "二", "三", "四", "五", "六", "日"];
    return chinaWeek[day-1];
}

export function formatTime(time) {
    time = time + "";
    if (time.length < 2) {
        return 0 + time;
    }
    return time
}

export function getDateFormat() {
    const data = new Date();
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const day = data.getDate();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();
    const week = data.getDay();
    return year + "年" + month + "月" + day + "日" + formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(
        seconds) + " 星期" + formatWeek(week);
}