import * as React from "react";
import { IApiResponse, IGameProgression } from "../../src/models/types";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Grid } from "@material-ui/core";

interface IProps {
    row: IGameProgression;
}

const GameRow: React.FC<IProps> = ({ row }) => {

    const { response, request, id } = row;

    const { success } = response;

    const see = response.youSee ? `You see: ${response.youSee}` : "There is nothing";

    return <TableRow key={`gameP${id}`}>
        <TableCell component="th" scope="row">
            {id}
        </TableCell>
        <TableCell align="left">{request.command}</TableCell>
        <TableCell align="right">
            <Grid container direction="column">
                {!success && <Grid item style={{ color: "red" }}>
                    This action is not possible
                    </Grid>
                }
                <Grid item>
                    {see}
                </Grid>
            </Grid>
        </TableCell>
    </TableRow>
};

export default GameRow;