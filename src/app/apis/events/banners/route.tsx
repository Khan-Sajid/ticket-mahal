import { type NextRequest } from "next/server";
import { banner } from "./banners";
export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json({ banner: banner });
}
