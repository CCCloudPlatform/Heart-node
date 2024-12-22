export namespace OpenstackResource {
  export type Flavor =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "42"
    | "84"
    | "c1"
    | "d1"
    | "d2"
    | "d3"
    | "d4";

  export type Image = "8155f52c-d670-4958-a7b9-63e7756ac5d7";

  export type CatalogType =
    | "identity"
    | "network"
    | "placement"
    | "compute_legacy"
    | "compute"
    | "block-storage"
    | "image";
}
