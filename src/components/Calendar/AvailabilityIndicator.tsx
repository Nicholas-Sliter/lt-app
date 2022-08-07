import styles from './Calendar.module.scss';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';


interface AvailabilityIndicatorProps {
    availability: "available" | "unavailable" | "waitlist" | undefined;
}

function AvailabilityIndicator({ availability }: AvailabilityIndicatorProps) {
    //const className = styles[`${availability}-indicator`];

    switch (availability) {
        case "available":
            return <AddCircleRoundedIcon className={[styles.available, styles.icon].join(" ")} />;
        case "unavailable":
            return <CancelRoundedIcon className={[styles.unavailable, styles.icon].join(" ")} />;
        case "waitlist":
            return <PendingRoundedIcon className={[styles.waitlist, styles.icon].join(" ")} />;
        default:
            return null;
    }

}


export default AvailabilityIndicator;