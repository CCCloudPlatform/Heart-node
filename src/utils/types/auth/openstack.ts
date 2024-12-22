import { NetworkEntity } from "@CCPlatform/dtos/models/network.entity";
import { SGEntity, SGRuleEntity } from "@CCPlatform/dtos/models/security-group";
import { SubnetEntity } from "@CCPlatform/dtos/models/subnet.entity";
import {
  KeypairEntity,
  VMEntity,
  VMFlavorEntity,
  VMImageEntity,
} from "@CCPlatform/dtos/models/vm.entity";
import { tags } from "typia";

import { OpenstackResource } from "../openstack";

export namespace OpenstackRequest {
  export namespace Axios {
    export namespace Body {
      export interface AuthToken {
        auth: {
          identity: {
            methods: ["password"];
            password: {
              user: {
                name: string;
                password: string;
                domain: { id?: string; name?: string };
              };
            };
          };
          scope?: {
            project: {
              id?: string;
              name?: string;
              domain?: { name?: string; id?: string };
            };
          };
        };
      }

      export interface CreateVM {
        server: {
          /**
           * VM 이름
           */
          name: string;
          /**
           * 이미지 ID
           */
          imageRef: string;
          /**
           * 인스턴스 타입 ID
           */
          flavorRef: string;
          /**
           * 네트워크
           */
          networks: { uuid: string }[];
          /**
           * SSH Key
           */
          key_name?: string;
        };
      }

      export interface CreateVMSnapshot {
        createImage: {
          name: string;
        };
      }

      export interface RestartVM {
        reboot: {
          type: "HARD" | "SOFT";
        };
      }

      export interface TurnOnVM {
        "os-start": null;
      }

      export interface TurnOffVM {
        "os-stop": null;
      }

      export interface TurnOffVMForced {
        "os-resetState": {
          state: "error";
        };
      }

      export interface CreateKeypair {
        keypair: {
          name: string;
        };
      }

      export interface CreateNetwork {
        network: {
          name: string;
          admin_state_up: boolean;
        };
      }

      export interface CreateSubnet {
        subnet: {
          name: string;
          network_id: Pick<NetworkEntity, "id">["id"];
          ip_version: 4 | 6;
          cidr: string;
          enable_dhcp: boolean;
        };
      }

      export interface CreateSG {
        security_group: {
          name: string;
          description: string;
        };
      }

      export interface CreateSecurityGroupRule {
        security_group_rule: {
          security_group_id: string;
          direction: "ingress" | "egress";
          ethertype: "IPv4";
          protocol: "tcp";
          port_range_min: number;
          port_range_max: number;
          remote_ip_prefix: string;
          description: string;
        };
      }
    }
  }

  export namespace Service {}
}

export namespace OpenstackResponse {
  export namespace Axios {
    export interface AccessToken {
      token: {
        methods: string[];
        user: {
          domain: { id: string; name: string }[];
          id: string;
          name: string;
          password_expires_at: string | null;
        };
        catalog?: {
          name: string;
          type: OpenstackResource.CatalogType;
          endpoints: {
            interface: string;
            region: string;
            url: string;
          }[];
        }[];
        audit_ids: string[];
        expires_at: string | null;
        issued_at: string | null;
      };
    }

    export interface CreateVM {
      server: {
        id: string;
        security_groups: unknown[];
      };
    }

    export interface GetVMList {
      servers: VMEntity[];
    }

    export interface CreateKeypair {
      keypair: KeypairEntity;
    }

    export interface GetKeypairList {
      keypairs: { keypair: KeypairEntity }[];
    }

    export interface GetImageList {
      images: VMImageEntity[];
    }

    export interface GetFlavorList {
      flavors: VMFlavorEntity[];
    }

    export interface CreateNetwork {
      network: {
        id: string;
        name: string;
        tenant_id: string;
        admin_state_up: boolean;
        mtu: number;
        status: string;
        subnets: string[];
        shared: boolean;
        project_id: string;
        port_security_enabled: boolean;
        "router:external": boolean;
        "provider:network_type": string;
        "provider:physical_network": null | string;
        "provider:segmentation_id": number;
        availability_zone_hints: string[];
        availability_zones: string[];
        ipv4_address_scope: null | string;
        ipv6_address_scope: null | string;
        description: string;
        tags: string[];
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        revision_number: number;
      };
    }

    export interface CreateSubnet {
      subnet: {
        id: string;
        name: string;
        tenant_id: string;
        network_id: string;
        ip_version: number;
        subnetpool_id: null | string;
        enable_dhcp: boolean;
        cidr: string;
        project_id: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
      };
    }

    export interface GetNetworkList {
      networks: NetworkEntity[];
    }

    export interface CreateSG {
      security_group: {
        id: string;
        name: string;
        stateful: boolean;
        tenant_id: string;
        description: string;
        shared: boolean;
        security_group_rules: unknown[];
        tags: string[];
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        revision_number: number;
        project_id: string;
      };
    }

    export interface CreateSecurityGroupRule {
      security_group_rule: {
        id: string;
        project_id: string;
        tenant_id: string;
        security_group_id: string;
        ethertype: "IPv4";
        direction: "ingress" | "egress";
        protocol: "tcp";
        port_range_min: number;
        port_range_max: number;
        remote_ip_prefix: string;
        normalized_cidr: string;
        description: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        revision_number: number;
      };
    }

    export interface GetSG {
      security_group: SGEntity;
    }

    export interface GetSGList {
      security_groups: SGEntity[];
    }
  }

  export namespace Service {
    export interface AccessToken {
      token: string;
      novaUrl?: string;
      neutronUrl?: string;
      keystoneUrl?: string;
      placementUrl?: string;
      cinderUrl?: string;
      glanceUrl?: string;
    }

    export type Projects = {
      id: string;
      name: string;
      domain_id: string;
      description: string;
      enabled: boolean;
      parent_id: string;
      id_domain: boolean;
    }[];

    export type CreateVM = Pick<VMEntity, "id">;

    export type GetVMList = VMEntity[];

    export type CreateKeypair = KeypairEntity;

    export type GetKeypairList = { keypair: KeypairEntity }[];

    export type GetImageList = VMImageEntity[];

    export type GetFlavorList = VMFlavorEntity[];

    export type CreateNetwork = Pick<NetworkEntity, "id" | "name">;

    export type CreateSubnet = Pick<SubnetEntity, "id">;

    export type GetNetworkList = NetworkEntity[];

    export type CreateSG = Pick<SGEntity, "id">;

    export type CreateSecurityGroupRule = Pick<SGRuleEntity, "id">;

    export type GetSG = SGEntity;

    export type GetSGList = SGEntity[];
  }
}
