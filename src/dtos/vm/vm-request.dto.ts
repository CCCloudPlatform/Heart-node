import { OpenstackResource } from "@CCPlatform/utils/types/openstack";

export namespace VMRequest {
  export namespace Body {
    export type CreateVM = {
      /**
       * VM 이름
       */
      vmName: string;
      /**
       *
       */
      flavorRef: OpenstackResource.Flavor;
      /**
       * 이미지 ID
       */
      imageId: OpenstackResource.Image;
      /**
       * 네트워크 ID
       */
      networkId: string;
      /**
       * SSH 키 이름
       */
      keyName?: string;
    };

    export type CreateVMSnapshot = {
      snapshotName: string;
    };

    export type RestartVM = {
      type: "HARD" | "SOFT";
    };

    export type CreateKaypair = {
      keypairName: string;
    };
  }

  export namespace Query {}
}
