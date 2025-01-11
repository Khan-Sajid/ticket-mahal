import { banner } from "./banners/banners";
import { recommendedEvents } from "./recommended/recommended";
import { upcomingEvents } from "./upcoming/upcoming";
import { premiumEvents } from "./premium/premium";
import { pastEvents } from "./past/past";

import { type NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({
    banner: banner,
    recommendedEvents: recommendedEvents,
    upcomingEvents:upcomingEvents,
    premiumEvents:premiumEvents,
    pastEvents: pastEvents
  });
}
