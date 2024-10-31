
export interface IContentPopup {
    solve: string;
    children: React.ReactNode;
}

export type Identifier = 'f' | 'b' | 'l' | 'r' | 'u' | 'd';

export interface IButtons {
    onGo: () => void;
    onSolve: () => void;
    onReset: () => void;
}

export interface IFace {
    identifier: Identifier;
    currentFace: Identifier;
    cube: any;
    onPress: (face: string) => void;
}
