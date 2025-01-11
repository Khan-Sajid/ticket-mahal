import { type NextRequest } from "next/server";
import { categories } from "./categories";
export async function GET(request: NextRequest) {
  return Response.json({ categories: categories });
}
