export namespace VMRequest {
  export namespace Body {
    export type CreateVM = {
      /**
       * VM 이름
       */
      vmName: string;
      /**
       * 이미지 ID
       */
      imageId: string;
      /**
       * 인스턴스 타입 ID
       */
      instanceTypeId: string;
      /**
       * 네트워크 ID
       */
      networkId: string;
      /**
       * SSH 키 이름
       */
      keyName?: string;
    };
  }

  export namespace Query {}
}
