
const = async() => {

    payload = {

    }

    try {
        const response = await api.post(" ", payload);
        const Data = response.data


    } catch (error) {
        console.log("Error from sending location data ", error)
    }

}