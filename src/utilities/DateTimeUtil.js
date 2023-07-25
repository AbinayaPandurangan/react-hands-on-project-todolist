const getTimeStamp = () => {
    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();
    let dateFormat = day + "/" + month + "/" + year;

    return dateFormat;
}
export default getTimeStamp;