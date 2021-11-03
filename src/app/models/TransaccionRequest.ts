import { BlockModel } from "./BlockModel";

export interface TransaccionRequest {
  idProducto: string;
  block: BlockModel[];
}
