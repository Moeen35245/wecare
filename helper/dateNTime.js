export const getDate = (str) => {
    const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(str);
    let day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString();
    let month =
        (date.getMonth() + 1).toString().length === 1
            ? '0' + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
    let year = date.getFullYear();
    let hour = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString(); //date.getHours();
    let min =
        date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(); //date.getMinutes();
    //   return (day + '/' + month + '/' + year + ',' + hour + ':' + min).toString()
    return (day + '/' + month + '/' + year).toString();
};

export const getTime = (str) => {
    str = str.slice(0, -8);
    let date = new Date(str);
    let hour = date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString(); //date.getHours();
    let min =
        date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(); //date.getMinutes();
    return (hour + ':' + min).toString();
};
