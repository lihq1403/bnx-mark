export const bnbFightAbi = [
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimedRewards",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "heroIds",
        type: "uint256",
      },
    ],
    name: "CreatedAndSendPrizeHero",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
    ],
    name: "CreatedHero",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
    ],
    name: "ExpeditedHero",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_attackingHero",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "enemyType",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "xpGained",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "hpLoss",
        type: "uint256",
      },
    ],
    name: "Fight",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "heroId",
        type: "uint256",
      },
    ],
    name: "MovedHeroToBag",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: !0,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: !0,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: !0,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "heroId",
        type: "uint256",
      },
    ],
    name: "TakeHeroFromBag",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
    ],
    name: "UnlockedLevel",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "UpdatedBNBPoolAddress",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "UpdatedBurnAddress",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "characterAddress",
        type: "address",
      },
    ],
    name: "UpdatedCharacterContract",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint256",
        name: "percent",
        type: "uint256",
      },
    ],
    name: "UpdatedDividePercent",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
    ],
    name: "UpdatedFirstLockTime",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "UpdatedPriceOracle",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "UpdatedTokenContract",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: !1,
        internalType: "uint8",
        name: "townType",
        type: "uint8",
      },
      {
        indexed: !1,
        internalType: "uint8",
        name: "level",
        type: "uint8",
      },
    ],
    name: "UpgradedTown",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "bannedList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bnbhPool",
    outputs: [
      {
        internalType: "contract IBNBHPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bnbhToken",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "characters",
    outputs: [
      {
        internalType: "contract IBNBHCharacter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dividePercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeToLevelup",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "firstLockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxHeroCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numTokensToSend",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOracle",
    outputs: [
      {
        internalType: "contract IPriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randoms",
    outputs: [
      {
        internalType: "contract IRandoms",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "unLockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "contract IBEP20",
        name: "_bnbhToken",
        type: "address",
      },
      {
        internalType: "contract IBNBHCharacter",
        name: "_bnbhCharacter",
        type: "address",
      },
      {
        internalType: "contract IBNBHPool",
        name: "_bnbhPool",
        type: "address",
      },
      {
        internalType: "contract IPriceOracle",
        name: "_priceOracle",
        type: "address",
      },
      {
        internalType: "contract IRandoms",
        name: "_randoms",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
    ],
    name: "migrateBannedList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setBannAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "setBurnAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "setBNBPoolAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "setPriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "setBNBHTokenContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "characterAddress",
        type: "address",
      },
    ],
    name: "setCharacterContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lockTime",
        type: "uint256",
      },
    ],
    name: "setFirstLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "percent",
        type: "uint256",
      },
    ],
    name: "setDividePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setNumTokensToSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setFeeToLvlUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "calcTown",
        type: "bool",
      },
    ],
    name: "getHero",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "name",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroType",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "xp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "armor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "level",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroClass",
            type: "uint256",
          },
        ],
        internalType: "struct HeroLibrary.Hero",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "calcTown",
        type: "bool",
      },
    ],
    name: "getHeroesByOwner",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "name",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroType",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "xp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "armor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "level",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroClass",
            type: "uint256",
          },
        ],
        internalType: "struct HeroLibrary.Hero[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getTownsOfPlayer",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "lastUpgradedTimeStamp",
            type: "uint256",
          },
        ],
        internalType: "struct HeroLibrary.Town[4]",
        name: "",
        type: "tuple[4]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "townType",
        type: "uint8",
      },
    ],
    name: "getTownLevel",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "sendPrizeHero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createNewHero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "heroId",
        type: "uint256",
      },
    ],
    name: "moveHeroToBag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "heroId",
        type: "uint256",
      },
    ],
    name: "takeHeroFromBag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getHeroesInBag",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "name",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroType",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "xp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "attack",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "armor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "speed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "level",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "heroClass",
            type: "uint256",
          },
        ],
        internalType: "struct HeroLibrary.Hero[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
    ],
    name: "unLockLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
    ],
    name: "getPriceToUnlockLevel",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_attackingHero",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "enemyType",
        type: "uint256",
      },
    ],
    name: "fight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_heroId",
        type: "uint256",
      },
    ],
    name: "expediteHero",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "townType",
        type: "uint8",
      },
    ],
    name: "upgradeTown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
















export const bnbhHeroAbi = [
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'seller',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'CancelledListing',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'seller',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbPrice',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbhPrice',
          type: 'uint256'
        }
      ],
      name: 'ListingPriceChange',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'seller',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbPrice',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbhPrice',
          type: 'uint256'
        }
      ],
      name: 'NewListing',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'buyer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'address',
          name: 'seller',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbPrice',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'bnbhPrice',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tax',
          type: 'uint256'
        }
      ],
      name: 'PurchaseListing',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: !0,
          internalType: 'bytes32',
          name: 'previousAdminRole',
          type: 'bytes32'
        },
        {
          indexed: !0,
          internalType: 'bytes32',
          name: 'newAdminRole',
          type: 'bytes32'
        }
      ],
      name: 'RoleAdminChanged',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        }
      ],
      name: 'RoleGranted',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        }
      ],
      name: 'RoleRevoked',
      type: 'event'
    },
    {
      inputs: [
      ],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'bannedList',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'bnbhToken',
      outputs: [
        {
          internalType: 'contract IBEP20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'characters',
      outputs: [
        {
          internalType: 'contract IBNBHCharacter',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'excludeFromTax',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        }
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'grantRole',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'lastTransferredTimes',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'maintenanceMode',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'minimumPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'priceOracle',
      outputs: [
        {
          internalType: 'contract IPriceOracle',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'renounceRole',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'revokeRole',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4'
        }
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'taxFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'taxFeeRecepient',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'contract IBEP20',
          name: '_bnbhToken',
          type: 'address'
        },
        {
          internalType: 'contract IBNBHCharacter',
          name: '_characters',
          type: 'address'
        }
      ],
      name: 'initialize',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'migrateExcludeFromTax',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]'
        }
      ],
      name: 'removeBannedHeores',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address'
        }
      ],
      name: 'setTokenAddress',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'character',
          type: 'address'
        }
      ],
      name: 'setCharacterAddress',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'mode',
          type: 'bool'
        }
      ],
      name: 'setmaintenanceMode',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'fee',
          type: 'uint256'
        }
      ],
      name: 'setTaxFee',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'setTaxFeeRecepient',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'oracle',
          type: 'address'
        }
      ],
      name: 'setPriceOracle',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'setMinimumPrice',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        },
        {
          internalType: 'bool',
          name: 'state',
          type: 'bool'
        }
      ],
      name: 'setBannedAccount',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_limit',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_pageNumber',
          type: 'uint256'
        }
      ],
      name: 'getCharacterListingIDsPage',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_limit',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_pageNumber',
          type: 'uint256'
        }
      ],
      name: 'getCharactersForPage',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'name',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'xp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'attack',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'armor',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'speed',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'hp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'seller',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'level',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroClass',
              type: 'uint256'
            }
          ],
          internalType: 'struct BNBHMarket.MarketHero[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'getAllTokenIds',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'seller',
          type: 'address'
        }
      ],
      name: 'getCharactersForSeller',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'name',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'xp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'attack',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'armor',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'speed',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'hp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'seller',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'level',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroClass',
              type: 'uint256'
            }
          ],
          internalType: 'struct BNBHMarket.MarketHero[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_heroId',
          type: 'uint256'
        }
      ],
      name: 'getCharacterDataById',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'name',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'xp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'attack',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'armor',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'speed',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'hp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'seller',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'level',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroClass',
              type: 'uint256'
            }
          ],
          internalType: 'struct BNBHMarket.MarketHero',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]'
        }
      ],
      name: 'getCharacterDataByIds',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'name',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroType',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'xp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'attack',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'armor',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'speed',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'hp',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'seller',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'level',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'heroClass',
              type: 'uint256'
            }
          ],
          internalType: 'struct BNBHMarket.MarketHero[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'getSellerOfNftID',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_seller',
          type: 'address'
        }
      ],
      name: 'getNumberOfListingsBySeller',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_seller',
          type: 'address'
        }
      ],
      name: 'getListingIDsBySeller',
      outputs: [
        {
          internalType: 'uint256[]',
          name: 'tokens',
          type: 'uint256[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
      ],
      name: 'getNumberOfCharacterListings',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_heroId',
          type: 'uint256'
        }
      ],
      name: 'canListOrChangePrice',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_price',
          type: 'uint256'
        }
      ],
      name: 'addListing',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_newPrice',
          type: 'uint256'
        }
      ],
      name: 'changeListingPrice',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256'
        }
      ],
      name: 'cancelListing',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256'
        }
      ],
      name: 'purchaseListing',
      outputs: [
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'address',
          name: '',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes'
        }
      ],
      name: 'onERC721Received',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ]
