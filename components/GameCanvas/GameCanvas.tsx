import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Actions from "../Actions/Actions";
import { IApiResponse, MazeCommands, IApiRequest, IGameProgression, IGameCell, ICoords } from "../../src/models/types";
import { useState } from "react";
import axios from "axios";
import { productionEndpoint } from "../../src/endpoints";
import BoardContainer from "../GameBoard/BoardContainer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import GameMap from "../Map/Map";

const useStyles = makeStyles({
    content: {
        padding: "2rem",
        margin: "1rem",
    },
});

const GameCanvas: React.FC<{}> = () => {

    const classes = useStyles();

    const [gameProgression, setGameProgression] = useState<IGameProgression[]>([]);
    const [gameCells, setGameCells] = useState<IGameCell[]>([]);
    const [currentCoords, setCurrentCoords] = useState<ICoords>({ x: 0, y: 0 });

    const commitCommand = async (command: MazeCommands) => {

        let currentProgression = gameProgression;
        let currentCoordinates = currentCoords;
        let currentCells = gameCells;

        if (command === "reset") {
            currentProgression = [];
            currentCoordinates = { x: 0, y: 0 };
            currentCells = [];
        }

        const data: IApiRequest = {
            command,
            token: "dbb96f18",
        };

        const gp: IGameProgression = {
            request: data,
            id: currentProgression.length + 1,
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
            currentProgression = [gp, ...currentProgression];

            if (!res.success) {
                const newCoords: ICoords = {
                    x: command === "east"
                        ? currentCoordinates.x + 1
                        : command === "west"
                            ? currentCoordinates.x - 1
                            : currentCoordinates.x,
                    y: command === "north"
                        ? currentCoordinates.y + 1
                        : command === "south"
                            ? currentCoordinates.y - 1
                            : currentCoordinates.y,
                };


                if (currentCells.find(x => x.coords === newCoords) == null) {
                    const gc: IGameCell = {
                        coords: newCoords,
                        colour: "#000000",
                    };

                    currentCells = [gc, ...currentCells];
                }
            } else {

                const newCoords: ICoords = res.success
                    ? {
                        x: command === "east"
                            ? currentCoordinates.x + 1
                            : command === "west"
                                ? currentCoordinates.x - 1
                                : currentCoordinates.x,
                        y: command === "north"
                            ? currentCoordinates.y + 1
                            : command === "south"
                                ? currentCoordinates.y - 1
                                : currentCoordinates.y,
                    }
                    : currentCoordinates;

                currentCoordinates = newCoords;

                if (currentCells.find(x => x.coords === newCoords) == null) {
                    const gc: IGameCell = {
                        coords: newCoords,
                        colour: res.lightColor || "",
                    };

                    currentCells = [gc, ...currentCells];
                }
            }
        }

        setGameProgression(currentProgression);
        setCurrentCoords(currentCoordinates);
        setGameCells(currentCells);

    };

    return <>
        <Grid container direction="row">
            <Grid item xs>
                <Paper className={classes.content}>
                    <BoardContainer gameProgression={gameProgression} />
                </Paper>
            </Grid>
            <Grid item xs container direction="column">

                <Grid item>
                    <Paper className={classes.content}>
                        <Actions commandHandler={commitCommand}
                            currentGameProgression={gameProgression[0] || null} />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.content}>
                        <Typography>
                            Current coordinates: {currentCoords.x}, {currentCoords.y}
                        </Typography>
                        <GameMap gameCells={gameCells} currentPosition={currentCoords} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </>;
};

export default GameCanvas;
