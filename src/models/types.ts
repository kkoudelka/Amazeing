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

export type MazeCommands = "north" | "south" | "east" | "west" | "reset" | "grab" | "exit";
