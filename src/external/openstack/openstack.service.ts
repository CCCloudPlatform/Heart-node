import { CCGlobal } from "@CCPlatform/cc-global";
import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import {
  OpenstackRequest,
  OpenstackResponse,
} from "@CCPlatform/utils/types/auth/openstack";
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class OpenstackService {
  constructor() {}

  async getAuthorizedToken(): Promise<OpenstackResponse.Service.AccessToken> {
    const { token } = await this.getAccessToken();

    const projects = await this.getProjects(token);

    const authorizedToken = await this.getAccessToken(projects?.[0].id);

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
                  project: { id: projectId },
                },
              }
            : {}),
        },
      } satisfies OpenstackRequest.Axios.Body.AuthToken,
    );

    const token = res.headers["x-subject-token"];

    const data: OpenstackResponse.Axios.AccessToken = res.data;

    const novaUrls = data.token.catalog?.filter((el) => el.name === "nova");

    return { token, novaUrl: novaUrls?.[0].endpoints?.[0].url };
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

  async createVM(
    input: VMRequest.Body.CreateVM,
    novaUrl: string,
    token: string,
  ): Promise<void> {
    const res = await axios.post(
      `${novaUrl}/servers`,
      {
        server: {
          name: input.vmName,
          flavorRef: input.instanceTypeId,
          imageRef: input.imageId,
          networks: [
            {
              uuid: input.networkId,
            },
          ],
          ...(input.keyName
            ? {
                key_name: input.keyName,
              }
            : {}),
        },
      } satisfies OpenstackRequest.Axios.Body.CreateVM,
      {
        headers: {
          "X-Auth-Token": token,
          "Content-Type": "application/json",
        },
      },
    );

    const vm = res.data;
  }
}
