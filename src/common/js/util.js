
/* 

解析url 

....?id = 123456&name = xiaoming
解析成 :{id:123456,name :"xiaoming"}
*/
export default function () {
    // console.log(window.location)
    let urlString = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    // match
    let arr = urlString.match(reg)
    if (arr) {
        arr.forEach((item) => {
            // substring(index) 返回值是字符串 从index开始 包括index 向后截取字符串
            let tempArr = item.substring(1).split("=")

            // obj[tempArr[0]] = tempArr[1];

            //  encodeURIComponent 和decodeURIComponent 可以编码和解码URI特殊字符(如#,/,$)
            let key = decodeURIComponent(tempArr[0])
            let val = decodeURIComponent(tempArr[1])
            obj[key] = val
        })
    }

    // console.log(urlString.match(reg))
    // console.log(obj)
    return obj
}