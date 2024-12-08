import { tags } from "typia";

export interface VMEntity {
  id: string & tags.Format<"uuid">;

  host: string;
}
