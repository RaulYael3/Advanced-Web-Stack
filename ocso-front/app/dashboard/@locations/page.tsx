import { TOKEN_NAME } from "@/constants"
import { Select, SelectItem } from "@heroui/react"
import axios from "axios";
import { cookies } from "next/headers"
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation"

const CountPage = async () => {
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)

    const {data} = await axios.get<Location[]>("http://172.28.224.1:3000/Locations", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <div className="w-2/12">
            <SelectLocation location={data}/>
        </div>
    )
};

export default CountPage;
