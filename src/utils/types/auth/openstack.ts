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
                domain: { id?: string };
              };
            };
          };
          scope?: {
            project: {
              id: string;
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
          type: string;
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

    export interface NovaUrl {}
  }

  export namespace Service {
    export interface AccessToken {
      token: string;
      novaUrl?: string;
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
  }
}
