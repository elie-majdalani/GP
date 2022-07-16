const register = async (displayName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    try {
        const res = await fetch("http://127.0.0.1:4001/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                displayName,
                email,
                password,
            })
        });
        const data = await res.json();
        if (data.status === 'success') {
            window.location.href = '/login';
        }
    }
    catch (err) {
        console.log(err);
    }
}