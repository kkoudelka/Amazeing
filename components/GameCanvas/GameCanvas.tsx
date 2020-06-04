import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Actions from "../Actions/Actions";
import { IApiResponse, MazeCommands, IApiRequest } from "../../src/models/types";
import { useState } from "react";
import axios from "axios";
import { productionEndpoint } from "../../src/endpoints";

const GameCanvas: React.FC<{}> = () => {

    const [gameProgression, setGameProgression] = useState<IApiResponse[]>([]);

    const commitCommand = async (command: MazeCommands) => {

        const data: IApiRequest = {
            command,
            token: "dbb96f18",
        };

        const d = `command=${data.command}&token=${data.token}`;

        const result = await axios({
            method: 'post',
            url: productionEndpoint,
            data: d,
          });

        if (result.status === 200) {
            const res: IApiResponse = result.data;
            setGameProgression([res, ...gameProgression]);
        }
    };

    return <>
        <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item xs>
                <Actions commandHandler={commitCommand} />
            </Grid>
        </Grid>
    </>;
};

export default GameCanvas;
