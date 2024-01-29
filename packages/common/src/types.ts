export type RequestPatch = {
  mina_accounts?:
    | ((args: IMinaProvider["request"]) => Promise<string[]>)
    | null;
  mina_requestAccounts?:
    | ((args: IMinaProvider["request"]) => Promise<string[]>)
    | null;

  mina_signMessage?:
    | ((args: IMinaProvider["request"]) => Promise<SignedData>)
    | null;

  mina_signFields?:
    | ((args: IMinaProvider["request"]) => Promise<SignedFieldsData>)
    | null;
  mina_createNullifier?:
    | ((args: IMinaProvider["request"]) => Promise<Nullifier>)
    | null;

  wallet_switchChain?:
    | ((args: IMinaProvider["request"]) => Promise<ChainInfoArgs>)
    | null;
  wallet_addChain?:
    | ((args: IMinaProvider["request"]) => Promise<ChainInfoArgs>)
    | null;
};

export type ProviderEvent =
  | "connect"
  | "disconnect"
  | "message"
  | "chainChanged"
  | "accountsChanged";

export type RequestArguments = {
  method: string;
  params?: unknown[] | object;
};

export type SignMessageArgs = {
  readonly message: string;
};

export interface SignedData {
  publicKey: string;
  data: string;
  signature: {
    field: string;
    scalar: string;
  };
}

export type SignFieldsArguments = {
  readonly message: (string | number)[];
};
export type SignedFieldsData = {
  data: (string | number)[];
  publicKey: string;
  signature: string;
};
export type SwitchChainArgs = {
  readonly chainId: string;
};

export type ChainInfoArgs = {
  chainId: string;
  name: string;
};
export type AddChainArgs = {
  readonly url: string;
  readonly name: string;
};

export type CreateNullifierArgs = {
  readonly message: (string | number)[];
};

export type Group = {
  x: bigint;
  y: bigint;
};

export type Nullifier = {
  publicKey: Group;
  public: {
    nullifier: Group;
    s: bigint;
  };
  private: {
    c: bigint;
    g_r: Group;
    h_m_pk_r: Group;
  };
};

export interface IMinaProvider {
  request(args: RequestArguments): Promise<string>;
  request(args: SignMessageArgs): Promise<SignedData>;
  request(args: SignFieldsArguments): Promise<SignedFieldsData>;
  request(args: CreateNullifierArgs): Promise<Nullifier>;
  request(args: SwitchChainArgs): Promise<ChainInfoArgs>;
  request(args: AddChainArgs): Promise<ChainInfoArgs>;
  request(args: { method: string; params?: Array<unknown> }): Promise<unknown>;
}
