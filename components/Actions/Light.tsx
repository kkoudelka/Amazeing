import * as React from "react";
import Paper from "@material-ui/core/Paper";


interface IProps {
    colour: string;
}

const Light: React.FC<IProps> = ({ colour }) => {

    return <>
        <Paper style={{ backgroundColor: colour, width: 100, height: "100%" }} />
    </>;
};

export default Light;
