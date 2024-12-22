import { tags } from "typia";

import { SubnetEntity } from "./subnet.entity";

export interface NetworkEntity {
  id: string;
  name: string;
  tenant_id: string;
  admin_state_up: boolean;
  mtu: number;
  status: string;
  subnets: string[];
  shared: boolean;
  "router:external": boolean;
  description: string;
  tags: string[];
  port_security_enabled: boolean;
  revision_number: number;
  project_id: string;
  created_at: string & tags.Format<"date-time">;
  updated_at: string & tags.Format<"date-time">;
}
