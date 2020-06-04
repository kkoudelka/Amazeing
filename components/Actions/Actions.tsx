import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { MazeCommands } from "../../src/models/types";
import { useEffect } from "react";

interface IProps {
    commandHandler: (actionName: MazeCommands) => Promise<void>;
}

const Actions: React.FC<IProps> = ({commandHandler}) => {

    const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(false);


    const commitAction = async (actionName: MazeCommands) => {
        setButtonsDisabled(true);
        await commandHandler(actionName);
        setButtonsDisabled(false);
    };

    useEffect(() => {
        commitAction("reset");
    }, []);

    return <>
        <Grid container direction="column">
            <Grid item container direction="row" xs>
                <Grid item xs>

                </Grid>
                <Grid item xs>
                    <Button variant="contained" color="primary" onClick={(_) => commitAction("north")}>
                        North
                    </Button>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
            <Grid item container direction="row" xs>
                <Grid item xs>
                    <Button variant="contained" color="primary" onClick={(_) => commitAction("west")}>
                        West
                    </Button>
                </Grid>
                <Grid item xs>

                </Grid>
                <Grid item xs>
                    <Button variant="contained" color="primary" onClick={(_) => commitAction("east")}>
                        East
                    </Button>
                </Grid>
            </Grid>
            <Grid item container direction="row" xs>
                <Grid item xs>

                </Grid>
                <Grid item xs>
                    <Button variant="contained" color="primary" onClick={(_) => commitAction("south")}>
                        South
                    </Button>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </Grid>
    </>;
};

export default Actions;
