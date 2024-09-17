export type IAuthPayload = {
  sub: string;
  aud: string;
  iss: string;
  jti: string;
};

export type ITokenResponse = {
  access_token: string;
  refresh_token: string;
};

export enum SortBy {
  status = 'status',
  created_at = 'created_at',
  updated_at = 'updated_at',
  name = 'name',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
