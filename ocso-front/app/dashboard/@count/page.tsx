import { TOKEN_NAME } from "@/constants"
import axios from "axios";
import { cookies } from "next/headers"

const CountPage = async () => {
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)

    const countLocations = await axios.get("http://172.28.224.1:3000/Locations", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const amount = countLocations?.data.length
    return <div className="w-2/12">{`Hay: ${amount} tienda${amount > 1 ? "s" : ""}`}</div>
};

export default CountPage;
