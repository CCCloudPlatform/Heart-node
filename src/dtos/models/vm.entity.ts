import { tags } from "typia";

export interface VMEntity {
  id: string;

  name: string;

  links: {
    rel: string;
    href: string;
  }[];
}

export interface KeypairEntity {
  private_key?: string;
  name: string;
  public_key: string;
  fingerprint: string;
  user_id?: string;
}

export interface VMImageEntity {
  instnace_uuid?: string;
  "owner_specified.openstack.object": string;
  owner_user_name?: string;
  image_type?: string;
  image_state?: string;
  image_location?: string;
  owner_project_name?: string;
  name: string;
  visibility: string;
  size: number;
  virtual_size: number;
  status: string;
  protected: boolean;
  min_ram: number;
  min_disk: number;
  owner: string;
  disk_format: string;
  user_id?: string;
  created_at: string & tags.Format<"date-time">;
  updated_at: string & tags.Format<"date-time">;
  tags: string[];
}

export interface VMFlavorEntity {
  id: string;
  name: string;
}
