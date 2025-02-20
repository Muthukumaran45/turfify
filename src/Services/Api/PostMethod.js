
const = async() => {

    payload = {

    }

    try {
        const response = await axios.post(`${API_URL}/`, payload);
        const data = response.data


    } catch (error) {
        console.log("Error from  ", error)
    }

}