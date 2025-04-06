import { API_URL, TOKEN_NAME } from "@/constants"
import { Select, SelectItem } from "@heroui/react"
import axios from "axios";
import { cookies } from "next/headers"
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation"
import FormNewLocation from "./_components/FormNewLocation"

const LocationPage = async ({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}) => {
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)

    const {data} = await axios.get<Location[]>(`${API_URL}/Locations`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <div className="w-5/12 h-[90vh] flex flex-col items-center">
            <div className="w-full">
                <div className="mx-10 w-1/2 my-10">
                    <SelectLocation location={data} store={searchParams.store}/>
                </div>
                <div className="w-6/12">
                    <FormNewLocation searchParams={searchParams} />
                </div>
            </div>
        </div>
    )
};

export default LocationPage;
