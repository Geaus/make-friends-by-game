export const getUser = (uid, callback) => {
    const params = new URLSearchParams();
    params.append('uid', uid);
    fetch('http://localhost:8080/getUser?' + params.toString())
    .then((response) => response.json())
        .then((data) => {callback(data)});
}