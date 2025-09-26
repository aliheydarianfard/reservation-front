import { Business } from "./business.model";
import { Province } from "./province.model";

export interface HomeData {
  items: Business[];
  provinces: Province[];
}