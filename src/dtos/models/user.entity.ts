import { tags } from "typia";

export interface UserEntity {
  id: string & tags.Format<"uuid">;

  username: string & tags.Format<"email">;

  password: string & tags.Format<"password">;

  nickname: string & tags.MinLength<3> & tags.MaxLength<10>;

  createdAt: string & tags.Format<"date-time">;

  updatedAt: string & tags.Format<"date-time">;

  deletedAt: string & tags.Format<"date-time">;
}
