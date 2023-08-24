import moment from "moment";

export const createSlug = (string) =>
    string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-");

export const reverseSlug = (slug) =>
    slug
        .split("-")
        .map((word) =>
            word.replace(/^\w/, (c) => c.toUpperCase()).replace(/_/g, " ")
        )
        .join(" ");

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

export const getBase64 = (file) => {
    if(!file) return "";
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
            const base64 = evt.target.result;
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    })
}
