export const billApiRoutes = (limit?: number, skip?: number, lang?: string) => {
  return {
    getBills: `/legislation?bill_status=Current,Withdrawn,Enacted,Rejected,Defeated,Lapsed&bill_source=&date_start=1900-01-01&date_end=2099-01-01&limit=${limit || 10}&skip=${skip || 0}&chamber_id=&lang=${lang || "en"}`,
  };
};
