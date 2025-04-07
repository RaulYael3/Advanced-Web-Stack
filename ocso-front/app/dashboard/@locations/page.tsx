import { API_URL } from "@/constants"
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation"
import FormNewLocation from "./_components/FormNewLocation"
import { authHeaders } from "@/helpers/authHeaders"

const LocationPage = async ({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}) => {

    const response = await fetch(`${API_URL}/locations`, 
        {
            headers:{...(await authHeaders())},
        }
    );
    const data: Location[] = await response.json();


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
