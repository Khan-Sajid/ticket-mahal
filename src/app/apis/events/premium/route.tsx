import {premiumEvents} from "./premium";
import {type NextRequest} from "next/server";
export async function GET(request:NextRequest) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return Response.json({premiumEvents:premiumEvents})
}