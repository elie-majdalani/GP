export const deposit = async (coin,user) => {
    const res = await axios.post("http://127.0.0.1:4001/deposit",{
        body: {
            coin,
            token: user.token,
            email: user.email
        }
    })
    return res.data
}