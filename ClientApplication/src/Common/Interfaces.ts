

export interface Thing{
    id: number,
    name: string,
    description: string,
    userid: number,
    kategoria: number 
} 

export interface Auction{
    id: number,
    startprice: number,
    thingID: number,
    thingName: string,
    thingDescription: string,
    thingKategoria: number,
    actualPrice :number,
    startTime: Date,
    endTime: Date,
    statusz: number
} 

export interface Bid{
    id:number,
    sum: number,
    auctionid: number,
    personid: number,
    personName: string,
    time: Date
}