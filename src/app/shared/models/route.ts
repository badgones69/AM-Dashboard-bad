import {IRoute} from "../interfaces/i-route";
import {Airport} from "./airport";

export class Route implements IRoute {
  id!: number;
  departureHub!: Airport;
  arrivalAirport!: Airport;
}
