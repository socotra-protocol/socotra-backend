/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface SocotraFactoryInterface extends utils.Interface {
  functions: {
    "splitBranch(address,uint256,string,string,string,string)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "splitBranch"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "splitBranch",
    values: [string, BigNumberish, string, string, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "splitBranch",
    data: BytesLike
  ): Result;

  events: {
    "SplitBranch(address,address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SplitBranch"): EventFragment;
}

export interface SplitBranchEventObject {
  branchAddr: string;
  parentToken: string;
  amount: BigNumber;
  issuer: string;
  branchId: BigNumber;
}
export type SplitBranchEvent = TypedEvent<
  [string, string, BigNumber, string, BigNumber],
  SplitBranchEventObject
>;

export type SplitBranchEventFilter = TypedEventFilter<SplitBranchEvent>;

export interface SocotraFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SocotraFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    splitBranch(
      parentToken: string,
      amount: BigNumberish,
      name: string,
      imageUrl: string,
      tokenName: string,
      tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  splitBranch(
    parentToken: string,
    amount: BigNumberish,
    name: string,
    imageUrl: string,
    tokenName: string,
    tokenSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    splitBranch(
      parentToken: string,
      amount: BigNumberish,
      name: string,
      imageUrl: string,
      tokenName: string,
      tokenSymbol: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "SplitBranch(address,address,uint256,address,uint256)"(
      branchAddr?: null,
      parentToken?: null,
      amount?: null,
      issuer?: null,
      branchId?: null
    ): SplitBranchEventFilter;
    SplitBranch(
      branchAddr?: null,
      parentToken?: null,
      amount?: null,
      issuer?: null,
      branchId?: null
    ): SplitBranchEventFilter;
  };

  estimateGas: {
    splitBranch(
      parentToken: string,
      amount: BigNumberish,
      name: string,
      imageUrl: string,
      tokenName: string,
      tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    splitBranch(
      parentToken: string,
      amount: BigNumberish,
      name: string,
      imageUrl: string,
      tokenName: string,
      tokenSymbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
