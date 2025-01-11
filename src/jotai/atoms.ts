import { IUserCompleteDetails } from "@/interfaces";
import { HomePageData } from "@/interfaces/home";
import { PreferredLocation } from "@/types/common";
import { atom } from "jotai";

export const homePageEvents = atom<HomePageData>();
export const userPrefferedLocation = atom<PreferredLocation>();
export const loginNeeded = atom(false);
export const userDetails = atom<IUserCompleteDetails>();
export const openVerification = atom<boolean>(false);
