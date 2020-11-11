
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';


export default function connection(): HubConnection{
    const hubConnection= new HubConnectionBuilder()
    .withUrl("https://localhost:5001/chat")
    .build();

    const sendSum = (i:number, s: number) => { 
        console.log("sendSum meghivva")
        hubConnection.invoke('SendSum',i, s)
        .catch((err: string) => console.error(err));  
    };

    try {
         hubConnection.start()
        console.log('Connection successful!')
    }
    catch (err) {
        alert(err);
    }
    return hubConnection;
}