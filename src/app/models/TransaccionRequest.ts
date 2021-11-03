import { BlockModel } from "./BlockModel";

export interface TransaccionRequest {
  productId: string;
  blocks: BlockModel[];
}
