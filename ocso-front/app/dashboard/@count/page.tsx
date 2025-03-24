import axios from "axios";

const CountPage = async () => {
    const countLocations = await axios.get("http://172.28.224.1:3000/Locations")

    return countLocations?.data.length
};

export default CountPage;
