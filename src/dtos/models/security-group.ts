import { tags } from "typia";

export interface SGEntity {
  id: string;
  name: string;
  stateful: boolean;
  tenant_id: string;
  description: string;
  shared: boolean;
  security_group_rules: SGRuleEntity[];
  tags: string[];
  created_at: string & tags.Format<"date-time">;
  updated_at: string & tags.Format<"date-time">;
  revision_number: number;
  project_id: string;
}

export interface SGRuleEntity {
  id: string;
  project_id: string;
  tenant_id: string;
  security_group_id: string;
  ethertype: string;
  direction: "ingress" | "egress";
  protocol: null | "tcp";
  /**
   * 허용 Port 범위의 최대 값
   */
  port_range_min: null | number;
  /**
   * 허용 Port 범위의 최소 값
   */
  port_range_max: null | number;
  /**
   * 허용 IP 범위. ex) 0.0.0.0/0
   */
  remote_ip_prefix: null | string;

  normalized_cidr: null | string;

  standard_attr_id: number;

  belongs_to_default_sg: null | boolean;

  description: null | string;

  tags: string[];

  created_at: string & tags.Format<"date-time">;

  updated_at: string & tags.Format<"date-time">;

  revision_number: number;
}
