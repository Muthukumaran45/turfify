
const = async() => {

    try {
        const response = await api.get(" ");
        const Data = response.data


    } catch (error) {
        console.log("Error from sending location data ", error)
    }

}