import EmployeeLocation from "./@locations/_components/EmployeeLocation"

export default function Dashboard({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}){
    return (
        <>
            <div className="h-full w-4/12 bg-red-100">
                <EmployeeLocation employee={searchParams?.store}/>
            </div>
            
        </>
    )
}