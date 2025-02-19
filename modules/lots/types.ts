export type Lot = {
  id: number;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type LotWithAvailability = Lot & {
  availability: number;
};
