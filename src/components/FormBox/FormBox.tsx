import React, { ReactChild, ReactChildren, ReactNode } from "react";
import styles from "./FormBox.module.scss";
import { Box } from "@mui/material";
import TextInput from "../Widgets/TextInput";

interface FormBoxProps {
    children: ReactChild[] | ReactChild;
    disabled?: boolean;
    invisible?: boolean;
}


function FormBox({
    children,
    disabled = false,
    invisible = false
}: FormBoxProps) {

    const components = React.Children.map(children, (child) => {
        if (disabled && child.type === TextInput) {
            return React.cloneElement(child, { disabled: disabled });
        }
        return child;
    })

    const boxClasses = [styles.container];
    if (invisible) {
        boxClasses.push(styles.invisible);
    }

    return (
        <Box className={boxClasses.join(" ")}>
            {components}
        </Box>
    );

}


export default FormBox;