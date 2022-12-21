
type AvailabilityDate = string;

type AvailabilityStatus = "available" | "unavailable" | "waitlist";

type Availability = Record<AvailabilityDate, AvailabilityStatus>;


export default Availability;
export type { Availability, AvailabilityDate, AvailabilityStatus };