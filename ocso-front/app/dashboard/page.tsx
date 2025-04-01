import EmployeeLocation from "./@locations/_components/EmployeeLocation"

export default function Dashboard({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}){
    return (
        <>
            <div className="h-full w-4/12 bg-red-100">
                <div className="h-[90vh] overflow-hidden overflow-y-auto flex flex-col gap-10">
                    <EmployeeLocation store={searchParams?.store}/>
                </div>
            </div>
            
        </>
    )
}