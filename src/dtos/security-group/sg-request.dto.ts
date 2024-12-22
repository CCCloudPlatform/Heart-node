export namespace SGRequest {
  export namespace Body {
    export interface CreateSG {
      /**
       * security group description
       */
      description: string;
      /**
       * security group name
       */
      sgName: string;
    }

    export interface CreateSGRule {
      securityGroupId: string;
      direction: "ingress" | "egress";
      etherType: "IPv4";
      protocol: "tcp";
      minPort: number;
      maxPort: number;
      allowIP: string;
      description: string;
    }
  }
}
