export const login = async (email, password) => {
    try {
        const res = await fetch("http://127.0.0.1:4001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        const user = await res.json();
        if (user.token) {
            localStorage.setItem('token', user.token);
            console.log(user);
            return user
        }}
    catch (err) {
        console.log(err);
    }}