export interface INodeDetails extends INodeState {
    latestUptime: INodeUptime;
    latestDiskInformation: INodeDiskState;
}

export interface INodeState {
    id: number;
    url: string;
    token: string;
    address: string;
    name: string;
    description: string;
    hasEnabledNotifications: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
}
export interface INodeInfoState {
    version: string;
    walletAddress: string;
    sectorSize: number;
    numberOfSectors: number;
    minerPower: number;
    totalPower: number;
    createdAt: string;
    updatedAt: string;
}
export interface INodeDiskState {
    id: number;
    freeSpace: number;
    takenSpace: number;
    createdAt: string;
    updatedAt: string;
    nodeId: number;
}

export interface INodeBalance {
    currentBalance: number;
    updatedAt: string;
    balanceChangePerc: string;
    balanceChange: number;
}

export interface IMiningReward {
    cid: string;
    id: number;
    rewardSum: string;
    timePeriod: string;
    nodeId: number;
}

export interface INodeDiskStateResponse {
    data: Array<INodeDiskState>;
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request: object;
}

export interface INodeDeal {
    id: number;
    cid: string;
    state: number;
    size: string;
    provider: string;
    price: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface INodeUptime {
    id: number;
    isWorking: boolean;
    createdAt: string;
    updatedAt: string;
}
