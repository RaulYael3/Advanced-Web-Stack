'use server'
export async function createLocation(formData: FormData) {
    let locations: any = {}
    let locationLatLng = [0,0]
    for(const key of formData.keys()) {
        const value = formData.get(key)
        if(value) {
            if(key.includes('locationLat')) {
                locationLatLng[0] = +value
                continue
            } else if(key.includes('locationLng')) {
                locationLatLng[1] = +value
                continue
            } else {
                locations[key] = formData.get(key)
            }
        }
    }

    locations.locationLatLng = locationLatLng

}   