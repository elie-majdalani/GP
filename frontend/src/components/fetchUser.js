export const User = async () => {
    try {
        const res = await fetch("http://127.0.0.1:4001/", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        })
        const user = await res.json();

        if (user) {
            return user
        }
    }
    catch (err) {
        console.log(err);
    }
}