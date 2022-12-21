export default interface Reservation {
    id?: number;
    language: string;
    course: string;
    date: string;
    first_name: string;
    last_name: string;
    email: string;
    middlebury_id: string;
    type?: string;
    created_at?: Date;
    is_cancelled?: boolean;
    on_waitlist?: boolean;
    attended?: boolean;
    attended_at?: Date;
    cancelled_at?: Date;
}
