export const getUser = (uid, callback) => {
    const params = new URLSearchParams();
    params.append('uid', uid);
    fetch('http://localhost:8080/getUser?' + params.toString())
        .then((response) => response.json())
        .then((data) => {callback(data)});
}

export const login = (username, password) => {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('用户名或密码错误');
            }
        })
        .then((data) => {
            sessionStorage.setItem('uid', data);
            return data;
        });
};

export const getTag = (callback) => {
    fetch('http://localhost:8080/getTag')
        .then((response) => response.json())
        .then((data) => {callback(data)});
}

export const searchUser = (username, tags, callback) => {
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tags)
    }
    const params = new URLSearchParams();
    let uid = sessionStorage.getItem('uid');
    params.append('userName', username);
    params.append('uid', uid);
    fetch('http://localhost:8080/searchUser?' + params.toString(), opts)
        .then((response) => response.json())
        .then((data) => {callback(data)})
}

export const addFriend = (target_id, callback) => {
    const params = new URLSearchParams();
    let uid = sessionStorage.getItem('uid');
    params.append('from_id', uid);
    params.append('to_id', target_id);
    fetch('http://localhost:8080/addFriend?' + params.toString())
        .then(() => callback())
}

export const acceptFriend = (target_id, callback) => {
    const params = new URLSearchParams();
    let uid = sessionStorage.getItem('uid');
    params.append('from_id', uid);
    params.append('to_id', target_id);
    fetch('http://localhost:8080/accept?' + params.toString())
        .then(() => callback())
}

export const rejectFriend = (target_id, callback) => {
    const params = new URLSearchParams();
    let uid = sessionStorage.getItem('uid');
    params.append('from_id', uid);
    params.append('to_id', target_id);
    fetch('http://localhost:8080/reject?' + params.toString())
        .then(() => callback())
}