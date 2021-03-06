export interface IApiResponse {
    success: boolean;
    haveKey: boolean;
    youSee: string | null;
    lightColor: string | null;
};

export interface IApiRequest {
    command: MazeCommands;
    token: string,
};

export interface IGameProgression {
    request: IApiRequest;
    response?: IApiResponse;
    id: number;
}

export type MazeCommands = "north" | "south" | "east" | "west" | "reset" | "grab" | "exit";

export type MazeItem = "none" | "key" | "door";

export interface IGameCell {
    coords: ICoords;
    colour: string;
    item: MazeItem;
}

export interface ICoords {
    x: number;
    y: number;
}
