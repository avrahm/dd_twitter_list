// github.com/embiem/D4R-subgraph
// api.thegraph.com/subgraphs/name/embiem/d4r

import { Wallet } from "../../config/Interfaces";

export async function checkGraph(walletAddress: Wallet) {
    if (!walletAddress) {
        return false;
    }
    const response = await fetch("https://api.thegraph.com/subgraphs/name/embiem/d4r", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            query: `{accounts(where:{id:"${walletAddress}"}){ id }}`,
        }),
    });
    const responseBody = await response.json();
    if (responseBody.data.accounts.length === 0) {
        return false;
    }
    return true;
}
