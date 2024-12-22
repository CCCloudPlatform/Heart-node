import { CCGlobal } from "@CCPlatform/cc-global";
import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import {
  OpenstackRequest,
  OpenstackResponse,
} from "@CCPlatform/utils/types/auth/openstack";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { tags } from "typia";

@Injectable()
export class OpenstackService {
  constructor() {}

  async getAuthorizedToken(): Promise<OpenstackResponse.Service.AccessToken> {
    // const { token } = await this.getAccessToken();

    // const projects = await this.getProjects(token);

    const authorizedToken = await this.getAccessToken();

    return authorizedToken;
  }

  async getAccessToken(
    projectId?: string,
  ): Promise<OpenstackResponse.Service.AccessToken> {
    const res = await axios.post(
      `${CCGlobal.env.OPENSTACK_AUTH_URL}/auth/tokens`,
      {
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                name: CCGlobal.env.OPENSTACK_USER_NAME,
                password: CCGlobal.env.OPENSTACK_PASSWORD,
                domain: { id: CCGlobal.env.OPENSTACK_DOMAIN },
              },
            },
          },
          ...(projectId
            ? {
                scope: {
                  project: {
                    id: projectId,
                  },
                },
              }
            : {
                scope: {
                  project: {
                    name: CCGlobal.env.OPENSTACK_PROJECT_NAME,
                    domain: { name: CCGlobal.env.OPENSTACK_DOMAIN },
                  },
                },
              }),
        },
      } satisfies OpenstackRequest.Axios.Body.AuthToken,
    );

    const token = res.headers["x-subject-token"];

    const data: OpenstackResponse.Axios.AccessToken = res.data;

    const novaUrls = data.token.catalog?.filter((el) => el.type === "compute");
    const neutronUrls = data.token.catalog?.filter(
      (el) => el.type === "network",
    );
    const keystoneUrls = data.token.catalog?.filter(
      (el) => el.type === "identity",
    );
    const placementUrls = data.token.catalog?.filter(
      (el) => el.type === "placement",
    );
    const cinderUrls = data.token.catalog?.filter(
      (el) => el.type === "block-storage",
    );
    const glanceUrls = data.token.catalog?.filter((el) => el.type === "image");

    return {
      token,
      novaUrl: novaUrls?.[0].endpoints?.[0].url,
      neutronUrl: neutronUrls?.[0].endpoints?.[0].url,
      keystoneUrl: keystoneUrls?.[0].endpoints?.[0].url,
      placementUrl: placementUrls?.[0].endpoints?.[0].url,
      cinderUrl: cinderUrls?.[0].endpoints?.[0].url,
      glanceUrl: glanceUrls?.[0].endpoints?.[0].url,
    };
  }

  async getProjects(
    token: string,
  ): Promise<OpenstackResponse.Service.Projects> {
    const res = await axios.get(
      `${CCGlobal.env.OPENSTACK_AUTH_URL}/auth/projects`,
      {
        headers: {
          "X-Auth-Token": token,
        },
      },
    );

    return res.data.projects;
  }

  async createVM(input: {
    body: VMRequest.Body.CreateVM;
    novaUrl: string;
    token: string;
  }): Promise<OpenstackResponse.Service.CreateVM> {
    const res = await axios.post(
      `${input.novaUrl}/servers`,
      {
        server: {
          name: input.body.vmName,
          flavorRef: input.body.flavorRef,
          imageRef: input.body.imageId,
          networks: [
            {
              uuid: input.body.networkId,
            },
          ],
          ...(input.body.keyName
            ? {
                key_name: input.body.keyName,
              }
            : {}),
        },
      } satisfies OpenstackRequest.Axios.Body.CreateVM,
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    const vm: OpenstackResponse.Axios.CreateVM = res.data;

    return {
      id: vm.server.id,
    };
  }

  async createVMSnapshot(input: {
    token: string;
    novaUrl: string;
    snapshotName: string;
    vmId: string;
  }): Promise<true> {
    await axios.post(
      `${input.novaUrl}/servers/${input.vmId}/action`,
      {
        createImage: {
          name: input.snapshotName,
        },
      },
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    return true;
  }

  async getVMList(input: {
    token: string;
    novaUrl: string;
  }): Promise<OpenstackResponse.Service.GetVMList> {
    const res = await axios.get(`${input.novaUrl}/servers`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const vmList: OpenstackResponse.Axios.GetVMList = res.data;

    return vmList.servers;
  }

  async restartVM(input: {
    token: string;
    novaUrl: string;
    vmId: string;
    type: "HARD" | "SOFT";
  }): Promise<true> {
    await axios.post(
      `${input.novaUrl}/servers/${input.vmId}/action`,
      {
        reboot: {
          type: input.type,
        },
      } satisfies OpenstackRequest.Axios.Body.RestartVM,
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    return true;
  }

  async turnOnVM(input: {
    token: string;
    novaUrl: string;
    vmId: string;
  }): Promise<true> {
    await axios.post(
      `${input.novaUrl}/servers/${input.vmId}/action`,
      {
        "os-start": null,
      } satisfies OpenstackRequest.Axios.Body.TurnOnVM,
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    return true;
  }

  async turnOffVM(input: {
    token: string;
    novaUrl: string;
    vmId: string;
  }): Promise<true> {
    await axios.post(
      `${input.novaUrl}/servers/${input.vmId}/action`,
      {
        "os-stop": null,
      } satisfies OpenstackRequest.Axios.Body.TurnOffVM,
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    return true;
  }

  async turnOffVMForced(input: {
    token: string;
    novaUrl: string;
    vmId: string;
  }): Promise<true> {
    await axios.post(
      `${input.novaUrl}/servers/${input.vmId}/action`,
      {
        "os-resetState": {
          state: "error",
        },
      } satisfies OpenstackRequest.Axios.Body.TurnOffVMForced,
      {
        headers: {
          "X-Auth-Token": input.token,
          "Content-Type": "application/json",
        },
      },
    );

    return true;
  }

  async createKeypair(input: {
    token: string;
    novaUrl: string;
    keypairName: string;
  }): Promise<OpenstackResponse.Service.CreateKeypair> {
    const res = await axios.post(
      `${input.novaUrl}/os-keypairs`,
      {
        keypair: {
          name: input.keypairName,
        },
      } satisfies OpenstackRequest.Axios.Body.CreateKeypair,
      {
        headers: {
          "X-Auth-Token": input.token,
        },
      },
    );

    const keypair: OpenstackResponse.Axios.CreateKeypair = res.data;

    return keypair.keypair;
  }

  async getKeypairList(input: {
    token: string;
    novaUrl: string;
  }): Promise<OpenstackResponse.Service.GetKeypairList> {
    const res = await axios.get(`${input.novaUrl}/os-keypairs`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const keypairList: OpenstackResponse.Axios.GetKeypairList = res.data;

    return keypairList.keypairs;
  }

  async getImageList(input: {
    token: string;
    glanceUrl: string;
  }): Promise<OpenstackResponse.Service.GetImageList> {
    const res = await axios.get(`${input.glanceUrl}/v2/images`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const imageList: OpenstackResponse.Axios.GetImageList = res.data;

    return imageList.images;
  }

  async getFlavorList(input: {
    token: string;
    novaUrl: string;
  }): Promise<OpenstackResponse.Service.GetFlavorList> {
    const res = await axios.get(`${input.novaUrl}/flavors`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const flavorList: OpenstackResponse.Axios.GetFlavorList = res.data;

    return flavorList.flavors;
  }

  async createNetwork(input: {
    neutronUrl: string;
    networkName: string;
    token: string;
  }): Promise<OpenstackResponse.Service.CreateNetwork> {
    const res = await axios.post(
      `${input.neutronUrl}/v2.0/networks`,
      {
        network: {
          name: input.networkName,
          admin_state_up: true,
        },
      } satisfies OpenstackRequest.Axios.Body.CreateNetwork,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": input.token,
        },
      },
    );

    const network: OpenstackResponse.Axios.CreateNetwork = res.data;

    return {
      id: network.network.id,
      name: network.network.name,
    };
  }

  async createSubnet(input: {
    token: string;
    neutronUrl: string;
    subnetName: string;
    ipVersion: 4 | 6;
    networkId: string & tags.Format<"uuid">;
    cidr: string;
    enableDhcp: boolean;
  }): Promise<OpenstackResponse.Service.CreateSubnet> {
    const res = await axios.post(
      `${input.neutronUrl}/v2.0/subnets`,
      {
        subnet: {
          name: input.subnetName,
          network_id: input.networkId,
          ip_version: input.ipVersion,
          cidr: input.cidr,
          enable_dhcp: input.enableDhcp,
        },
      } satisfies OpenstackRequest.Axios.Body.CreateSubnet,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": input.token,
        },
      },
    );

    const subnet: OpenstackResponse.Axios.CreateSubnet = res.data;

    return {
      id: subnet.subnet.id,
    };
  }

  async getNetworkList(input: {
    token: string;
    neutronUrl: string;
  }): Promise<OpenstackResponse.Service.GetNetworkList> {
    const res = await axios.get(`${input.neutronUrl}/v2.0/networks`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const networkList: OpenstackResponse.Axios.GetNetworkList = res.data;

    return networkList.networks;
  }

  async createSecurityGroup(input: {
    token: string;
    neutronUrl: string;
    sgName: string;
    description: string;
  }): Promise<OpenstackResponse.Service.CreateSG> {
    const res = await axios.post(
      `${input.neutronUrl}/v2.0/security-groups`,
      {
        security_group: {
          name: input.sgName,
          description: input.description,
        },
      } satisfies OpenstackRequest.Axios.Body.CreateSG,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": input.token,
        },
      },
    );

    const sg: OpenstackResponse.Axios.CreateSG = res.data;

    return {
      id: sg.security_group.id,
    };
  }

  async createSecurityGroupRule(input: {
    token: string;
    neutronUrl: string;
    securityGroupId: string;
    direction: "ingress" | "egress";
    etherType: "IPv4";
    protocol: "tcp";
    minPort: number;
    maxPort: number;
    allowIP: string;
    description: string;
  }): Promise<OpenstackResponse.Service.CreateSecurityGroupRule> {
    const res = await axios.post(
      `${input.neutronUrl}/v2.0/security-group-rules`,
      {
        security_group_rule: {
          security_group_id: input.securityGroupId,
          direction: input.direction,
          ethertype: input.etherType,
          port_range_min: input.minPort,
          port_range_max: input.maxPort,
          protocol: input.protocol,
          remote_ip_prefix: input.allowIP,
          description: input.description,
        },
      } satisfies OpenstackRequest.Axios.Body.CreateSecurityGroupRule,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": input.token,
        },
      },
    );

    const sgRule: OpenstackResponse.Axios.CreateSecurityGroupRule = res.data;

    return {
      id: sgRule.security_group_rule.security_group_id,
    };
  }

  async getSecurityGroupInfo(input: {
    sgId: string;
    neutronUrl: string;
    token: string;
  }): Promise<OpenstackResponse.Service.GetSG> {
    const res = await axios.get(
      `${input.neutronUrl}/v2.0/security-groups/${input.sgId}`,
      {
        headers: {
          "X-Auth-Token": input.token,
        },
      },
    );

    const sg: OpenstackResponse.Axios.GetSG = res.data;

    return sg.security_group;
  }

  async getSecurityGroupList(input: {
    token: string;
    neutronUrl: string;
  }): Promise<OpenstackResponse.Service.GetSGList> {
    const res = await axios.get(`${input.neutronUrl}/v2.0/security-groups`, {
      headers: {
        "X-Auth-Token": input.token,
      },
    });

    const sgList: OpenstackResponse.Axios.GetSGList = res.data;

    return sgList.security_groups;
  }
}
