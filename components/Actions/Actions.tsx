import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { MazeCommands, IGameProgression } from "../../src/types";
import { useEffect } from "react";
import Light from "./Light";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
    commandHandler: (actionName: MazeCommands) => Promise<void>;
    currentGameProgression: IGameProgression;
}

const useStyles = makeStyles({
    content: {
        width: 100,
        minWidth: 100,
    },
});

const Actions: React.FC<IProps> = ({ commandHandler, currentGameProgression }) => {

    const classes = useStyles();

    const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(false);

    const { response } = currentGameProgression || { response: { haveKey: false, youSee: "", lightColor: "transparent" } };
    const { haveKey, youSee, lightColor } = response;

    const seeKey = youSee === "key";
    const seeExit = youSee === 'exit';

    const commitAction = async (actionName: MazeCommands) => {
        setButtonsDisabled(true);
        await commandHandler(actionName);
        setButtonsDisabled(false);
    };

    useEffect(() => {
        commitAction("reset");
    }, []);

    return <>
        <Grid container direction="column" spacing={2} justify="space-around">
            <Grid item container direction="row" xs justify="center">
                <Grid item xs>

                </Grid>
                <Grid item xs alignContent="center">
                    <Button className={classes.content} variant="contained" disabled={buttonsDisabled} color="primary" onClick={(_) => commitAction("north")}>
                        North
                    </Button>
                </Grid>
                <Grid item xs>
                    <Button className={classes.content} variant="outlined" disabled={buttonsDisabled} color="primary" onClick={(_) => commitAction("reset")}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
            <Grid item container direction="row" xs justify="space-around">
                <Grid item xs>
                    <Button className={classes.content} variant="contained" disabled={buttonsDisabled} color="primary" onClick={(_) => commitAction("west")}>
                        West
                    </Button>
                </Grid>
                <Grid className={classes.content} item xs>
                    <Light colour={lightColor} />
                </Grid>
                <Grid item xs>
                    <Button className={classes.content} variant="contained" disabled={buttonsDisabled} color="primary" onClick={(_) => commitAction("east")}>
                        East
                    </Button>
                </Grid>
            </Grid>
            <Grid item container direction="row" xs>
                <Grid item xs>
                    <Button className={classes.content} variant="outlined" disabled={!seeKey || buttonsDisabled} color="primary" onClick={(_) => commitAction("grab")}>
                        Grab
                    </Button>
                </Grid>
                <Grid item xs>
                    <Button className={classes.content} variant="contained" disabled={buttonsDisabled} color="primary" onClick={(_) => commitAction("south")}>
                        South
                    </Button>
                </Grid>
                <Grid item xs>
                    <Button className={classes.content} variant="outlined" disabled={buttonsDisabled || !seeExit || !haveKey} color="primary" onClick={(_) => commitAction("exit")}>
                        Leave
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </>;
};

export default Actions;
