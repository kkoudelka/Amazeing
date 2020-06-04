import * as React from "react";
import { IGameCell, MazeItem } from "../../src/models/types";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

interface IProps {
    cell: IGameCell;
    current: boolean;
}

const MapTile: React.FC<IProps> = ({ cell, current }) => {

    const { colour, coords, item } = cell;
    const { x, y } = coords;

    const transformX = current
        ? x * 20 - 2
        : x * 20;
    const transformY = current
        ? y * 20 * (-1) - 2
        : y * 20 * (-1);


    return <>
        <div style={{
            position: "absolute",
            backgroundColor: colour,
            width: 20,
            height: 20,
            left: "50%",
            top: "50%",
            transition: "0s",
            transform: `translate(${transformX}px,${transformY}px)`,
            border: current ? "2px solid black" : "",
        }}>
            {item === "key" && <VpnKeyIcon fontSize="small" />}
            {item === "door" && <MeetingRoomIcon fontSize="small" />}

        </div>
    </>;
};

export default MapTile;