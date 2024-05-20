import { billApiRoutes } from "../constants/Routes";
import type { TLanguage } from "../models/Types";

// We could persist language (locale) from the store since api supports it,
// but felt it was not the part of this task - just titiles.
export async function fetchBillsDataAPI(
  limit?: number,
  skip?: number,
  lang?: TLanguage,
) {
  const response = await fetch(billApiRoutes(limit, skip, lang).getBills, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });

  return response;
}
