
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export const connection : HubConnection= new HubConnectionBuilder()
.withUrl("https://localhost:5001/biding")
.build();




