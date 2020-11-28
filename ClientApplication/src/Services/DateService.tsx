
export function stringFromDate (date : Date) : string 
{
    var finaldate : string = new Date(date).toLocaleString(); 
    return finaldate;
}

export function remainingTime (date :Date) : string
{
    var difference : number = new Date(date).getTime()-new Date().getTime();
    var days : number = Math.ceil(difference/((1000 * 3600 * 24)))-1;
    var hours : number = Math.ceil((difference-(1000*3600*24*days))/(1000*3600))-1;
    var mins : number = Math.ceil((difference-(1000*3600*24*days)-(1000*3600*hours))/(1000*60))-1;
    var sec : number = Math.ceil((difference-(1000*3600*24*days)-(1000*3600*hours)-(1000*60*mins))/(1000))-1;
    var diff : string= days+" days, "+hours+" hours, "+mins+" mins, "+sec+" sec";
    return diff;
}