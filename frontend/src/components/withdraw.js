export const withdraw = async (coin,user,amount) => {
    const res = await axios.post("http://127.0.0.1:4001/withdraw",{
        body: {
            coin,
            email: user.email,
            amount: amount,
            token: user.token
        }
    })
    return res.data
}