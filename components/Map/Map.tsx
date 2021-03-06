import * as React from "react";
import { IGameCell, ICoords } from "../../src/types";
import MapTile from "./MapTile";

interface IProps {
    gameCells: IGameCell[];
    currentPosition: ICoords;
}

const GameMap: React.FC<IProps> = ({ gameCells, currentPosition }) => {

    return <>
        <div style={{
            position: "relative",
            width: "100%",
            height: "27rem"
        }}>
            {
                gameCells.map((cell) => <MapTile cell={cell} current={cell.coords === currentPosition} />)
            }

        </div>
    </>;
};

export default GameMap;