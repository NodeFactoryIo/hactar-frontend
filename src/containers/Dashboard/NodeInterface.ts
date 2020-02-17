export interface INodeState {
    id: number;
    url: string;
    token: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}
export interface INodeInfoState {
    version: string;
    sectorSize: number;
    minerPower: number;
    totalPower: number;
}
