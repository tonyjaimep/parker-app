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

export type CreateLotRequestDto = {
  name: string;
  address: string;
  location: Coordinates;
  spotsCount: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};
