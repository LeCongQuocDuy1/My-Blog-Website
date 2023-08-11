import moment from "moment";

export const createSlug = (string) =>
    string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-");

export const formatDateTimeAgo = (datetime) => {
    const now = moment(); // lấy thời điểm hiện tại
    const pastDatetime = moment(datetime); // format ngày tháng được truyền vào

    const duration = moment.duration(now.diff(pastDatetime)); // tính toán và lấy ra sự chênh lệch của ngày hiện tại và ngày truyền vào
    const seconds = duration.asSeconds(); // lấy ra giây
    const minutes = duration.asMinutes(); // lấy ra phút
    const hours = duration.asHours(); // lấy ra giờ

    if (seconds < 60) {
        const secondsAgo = Math.round(seconds);
        return `${secondsAgo} giây trước`;
    } else if (minutes < 60) {
        const minutesAgo = Math.round(minutes);
        return `${minutesAgo} phút trước`;
    } else if (hours < 24) {
        const hoursAgo = Math.round(hours);
        return `${hoursAgo} giờ trước`;
    } else {
        return pastDatetime.format("D [Th]M");
    }
};

// const moment = require('moment');

// const datetime = '2023-08-10T14:40:56.639Z';
// const now = moment();
// const pastDatetime = moment(datetime);

// const duration = moment.duration(now.diff(pastDatetime));
// const seconds = duration.asSeconds();
// const minutes = duration.asMinutes();
// const hours = duration.asHours();

// if (seconds < 60) {
//   const secondsAgo = Math.round(seconds);
//   const output = `${secondsAgo} giây trước`;
//   console.log(output);
// } else if (minutes < 60) {
//   const minutesAgo = Math.round(minutes);
//   const output = `${minutesAgo} phút trước`;
//   console.log(output);
// } else if (hours < 24) {
//   const hoursAgo = Math.round(hours);
//   const output = `${hoursAgo} giờ trước`;
//   console.log(output);
// } else {
//   const formattedDatetime = pastDatetime.format('D [Th]M');
//   const output = formattedDatetime;
//   console.log(output);
// }
