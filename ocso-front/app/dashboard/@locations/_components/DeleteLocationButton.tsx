import DeleteLocation from "@/actions/locations/delete"

export default function DeleteLocationButton({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}) {
    if(!searchParams.store) return null

    return(
        <form action={DeleteLocation}>
            <button 
                type="submit" 
                className="bg-red-500 rounded-2xl py-3 p-7 justify-center"
                name="deleteValue"
                value={searchParams.store}
            >
                Eliminar
            </button>
        </form>
    )
}