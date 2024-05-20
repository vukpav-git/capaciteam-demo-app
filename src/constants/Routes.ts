import type { TLanguage } from "../models/Types";

// *** API routes
export const billApiRoutes = (
  limit?: number,
  skip?: number,
  lang: TLanguage = "en",
) => {
  return {
    getBills: `/legislation?bill_status=Current,Withdrawn,Enacted,Rejected,Defeated,Lapsed&bill_source=&date_start=1900-01-01&date_end=2099-01-01&limit=${limit || 10}&skip=${skip || 0}&chamber_id=&lang=${lang}`,
  };
};

// *** Client routes

// We could go here with react router
// again for favourited bills part of this task, but I have implemented it
// another way (router would be easy to do)!
