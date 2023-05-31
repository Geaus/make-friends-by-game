
export const getMessage = (from_uid, to_uid, callback) => {
    const params = new URLSearchParams();
    params.append('from_uid', from_uid);
    params.append('to_uid', to_uid);
    fetch('http://localhost:8080/getMessages?'+params.toString())
    .then((response) => response.json())
        .then((data) => {callback(data)});
}