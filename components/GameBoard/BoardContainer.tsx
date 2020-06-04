import * as React from "react";
import { IApiResponse, IGameProgression } from "../../src/types";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GameRow from "./GameRow";

interface IProps {
    gameProgression: IGameProgression[];
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const BoardContainer: React.FC<IProps> = ({ gameProgression }) => {
    const classes = useStyles();

    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Command</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gameProgression.map((row) => (<GameRow row={row} />))}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
};

export default BoardContainer;