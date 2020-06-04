import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Actions from "../Actions/Actions";
import { IApiResponse, MazeCommands, IApiRequest, IGameProgression } from "../../src/models/types";
import { useState } from "react";
import axios from "axios";
import { productionEndpoint } from "../../src/endpoints";
import BoardContainer from "../GameBoard/BoardContainer";

const GameCanvas: React.FC<{}> = () => {

    const [gameProgression, setGameProgression] = useState<IGameProgression[]>([]);

    const commitCommand = async (command: MazeCommands) => {
        
        // TODO: Update fields when reseted
        // if (command === "reset") {
        //     setGameProgression([]);
        // }

        const data: IApiRequest = {
            command,
            token: "dbb96f18",
        };

        const gp: IGameProgression = {
            request: data,
            id: gameProgression.length + 1,
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
            setGameProgression([gp, ...gameProgression]);
        }
    };

    return <>
        <Grid container spacing={8}>
            <Grid item xs>
                <BoardContainer gameProgression={gameProgression} />
            </Grid>
            <Grid item xs>
                <Actions commandHandler={commitCommand}
                    currentGameProgression={gameProgression[0] || null} />
            </Grid>
        </Grid>
    </>;
};

export default GameCanvas;
