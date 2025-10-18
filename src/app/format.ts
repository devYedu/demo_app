export interface TimeZones{
    status:string,
    message:string,
    zones: Zone[]
}
export interface Zone{
    countryCode:string,
    countryName:string,
    zoneName:string,
    gmtOffset:number,
    timestamp:number
}

export interface TimeData{
abbreviation:string,
cityName:string,
countryCode:string,
countryName:string,
dst:string,
formatted:string,
gmtOffset:number,
message:string,
nextAbbreviation:string,
regionName:string,
status:string,
timestamp:number,
zoneEnd:string,
zoneName:string,
zoneStart:number,
}