import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Actions from "../Actions/Actions";
import { IApiResponse, MazeCommands, IApiRequest, IGameProgression } from "../../src/models/types";
import { useState } from "react";
import axios from "axios";
import { productionEndpoint } from "../../src/endpoints";
import BoardContainer from "../GameBoard/BoardContainer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    content: {
        padding: "2rem",
        margin: "2rem",
    },
});

const GameCanvas: React.FC<{}> = () => {

    const classes = useStyles();

    const [gameProgression, setGameProgression] = useState<IGameProgression[]>([]);

    const commitCommand = async (command: MazeCommands) => {

        let current = gameProgression;

        if (command === "reset") {
            current = [];
        }

        const data: IApiRequest = {
            command,
            token: "dbb96f18",
        };

        const gp: IGameProgression = {
            request: data,
            id: current.length + 1,
        };



        const d = `command=${data.command}&token=${data.token}`;

        const result = await axios({
            method: 'post',
            url: productionEndpoint,
            data: d,
        });

        if (result.status === 200) {
            const res: IApiResponse = result.data;
            gp.response = res;
            current = [gp, ...current];
            
        }

        setGameProgression(current);
    };

    return <>
        <Grid container>
            <Grid item xs>
                <Paper className={classes.content}>
                    <BoardContainer gameProgression={gameProgression} />
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.content}>
                    <Actions commandHandler={commitCommand}
                        currentGameProgression={gameProgression[0] || null} />
                </Paper>
            </Grid>
        </Grid>
    </>;
};

export default GameCanvas;
