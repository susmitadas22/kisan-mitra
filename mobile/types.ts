export type DiseaseReponseType = {
  id: string;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  disease: string | null;
  cure: string | null;
  cause: string | null;
  preventions: string | null;
  symptoms: string | null;
  mimeType: string;
  lat: number;
  lng: number;
};

export type InventoryItemType = {
  id: string;
  name: string;
};
