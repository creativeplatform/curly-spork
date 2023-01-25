import { useContractRead } from 'wagmi'

const { data } = useContractRead({
    // ^? const data: BigNumber | undefined
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: [
        {
            name: 'getUncleanliness',
            inputs: [],
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            name: 'love',
            inputs: [{ name: '', type: 'address' }],
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            name: 'play',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],

    functionName: 'love',
    // ^? (property) functionName?: "getUncleanliness" | "love" | undefined
    // Notice how "play" is not included since it is not a "read" function

    args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
    // ^? (property) args?: readonly [`0x${string}`] | undefined

    onSuccess(data) {
        // ^? (parameter) data: BigNumber
    },
    // Type inference flows to other configuration parameters as well:
    // - select?: ((data: BigNumber) => BigNumber) | undefined
    // - onSettled?: ((data: BigNumber | undefined, error: Error | null) => void) | undefined
    // - …
});

export default data;
