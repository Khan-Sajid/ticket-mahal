import { GenderType, Verification } from "@/constants/enums";

export interface IUser {
  _id: string;
  email: string;
  phoneNo: string;
  countryCode: string;
  name: string;
  socialType: string;
  status: string;
  __v: number;
  favEventIds: string[];
  createdAt: Date;
  updatedAt: Date;
  profilePic: string;
  dob: string | null;
  addresses: Partial<Address>[];
  genderType: GenderType;
  isEmailVerified: Verification;
  isPhoneNoVerified: Verification;
  isSubscribed: boolean;
}

export interface Address {
  zipCode: string;
  addressType: string;
  country: string;
  state: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCompleteDetails extends IUser {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
