
const = async() => {
    
    try {
        const response = await axios.get(`${API_URL}/ ` ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data

    } catch (error) {
        console.log("Error from  ", error)
    }

}