import { ExecutionResponse } from "@sherrylinks/sdk";
import { NextRequest, NextResponse } from "next/server";
import { avalancheFuji } from "viem/chains";
import { serialize } from "wagmi";
import { encodeFunctionData, TransactionSerializable } from "viem";
import { abi } from "@/blockchainAbi/feedbackAbi";

const CONTRACT_ADDRESS = "0x9d1E517c84DF0A7672DA68784436813ae96b5FA8";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feedback = searchParams.get("feedback");

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback parameter is required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    console.log("feedback", feedback);

    // Encode the contract function data
    const data = encodeFunctionData({
      abi: abi,
      functionName: "updateMessage",
      args: [feedback], 
    });

    // Create smart contract transaction
    const tx: TransactionSerializable = {
      to: CONTRACT_ADDRESS,
      data: data,
      chainId: avalancheFuji.id,
      type: "legacy",
    };

    // Serialize transaction
    const serialized = serialize(tx);

    // Create response
    const resp: ExecutionResponse = {
      serializedTransaction: serialized,
      chainId: avalancheFuji.name,
    };

    return NextResponse.json(resp, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
