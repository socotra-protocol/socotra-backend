/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SocotraFactory,
  SocotraFactoryInterface,
} from "../SocotraFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "branchAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "parentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "branchId",
        type: "uint256",
      },
    ],
    name: "SplitBranch",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "parentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
    ],
    name: "splitBranch",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SocotraFactory__factory {
  static readonly abi = _abi;
  static createInterface(): SocotraFactoryInterface {
    return new utils.Interface(_abi) as SocotraFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SocotraFactory {
    return new Contract(address, _abi, signerOrProvider) as SocotraFactory;
  }
}