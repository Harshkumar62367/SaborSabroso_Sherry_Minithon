import {
  createMetadata,
  Metadata,
  ValidatedMetadata,
  ExecutionResponse,
} from "@sherrylinks/sdk";
import { NextRequest, NextResponse } from "next/server";
import { avalancheFuji } from "viem/chains";
import { serialize } from "wagmi";
import { encodeFunctionData, TransactionSerializable } from "viem";
import { abi } from "@/blockchainAbi/feedbackAbi";

const CONTRACT_ADDRESS = "0x9d1E517c84DF0A7672DA68784436813ae96b5FA8";

export async function GET(req: NextRequest) {
  try {
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const serverUrl = `${protocol}://${host}`;

    const metadata: Metadata = {
      url: "https://sherry.social",
      icon: "https://avatars.githubusercontent.com/u/117962315",
      title: "Review our Restaurant",
      baseUrl: serverUrl,
      description:
        "Submit your feedback and ratings for our restaurant directly on the blockchain.",
      actions: [
        {
          type: "dynamic",
          label: "Restaurant Feedback",
          description: "Share your thoughts and ratings",
          chains: { source: "fuji" },
          path: `/api/rating-app`,
          params: [
            {
              name: "Your Feedback",
              label: "Feedback!",
              type: "textarea",
              required: true,
              description:
                "Enter the feedback you want to store on the blockchain",
            },
            {
              name: "Rating",
              label: "Give your ratings (Between 1 and 5)",
              type: "number",
              required: true,
              description:
                "Enter the rating you want to store on the blockchain",
            },
          ],
        },
      ],
    };

    // Validating metadata using the Sherry SDK
    const validated: ValidatedMetadata = createMetadata(metadata);

    // Return with CORS headers for cross-origin access
    return NextResponse.json(validated, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
  } catch (error) {
    console.error("Error creating metadata:", error);
    return NextResponse.json(
      { error: "Failed to create metadata" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feedback = searchParams.get("feedback");
    const rating = searchParams.get("rating");

    if (!feedback || !rating) {
      return NextResponse.json(
        { error: "Both feedback and rating parameters are required" },
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

    // Validate rating is a number
    const ratingNum = Number(rating);
    if (isNaN(ratingNum)) {
      return NextResponse.json(
        { error: "Rating must be a valid number" },
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

    // Validate rating is between 1 and 5
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
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

    // Calculate feedback score using our custom algorithm
    const feedbackScore = calculateFeedbackScore(feedback, ratingNum);

    // Encode the contract function data
    const data = encodeFunctionData({
      abi: abi,
      functionName: "storeFeedback",
      args: [feedback, feedbackScore],
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

// My custom algorithm to calculate a unique feedback score based on content and rating so that message should convey the sentiment of the feedback rating.
function calculateFeedbackScore(feedback: string, rating: number): number {
  // Will start with the base rating provided by the user
  let score = rating;

  // Will add small bonuses or penalties
  let adjustment = 0;

  // Small bonuses or penalties will be added to the score below:
  // Check for positive and negative words
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "amazing",
    "wonderful",
    "fantastic",
    "love",
    "best",
    "delicious",
    "tasty",
  ];
  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "poor",
    "disappointing",
    "worst",
    "disgusting",
    "cold",
    "overcooked",
  ];

  const words = feedback.toLowerCase().split(" ");
  const positiveWordCount = words.filter((word) =>
    positiveWords.includes(word)
  ).length;
  const negativeWordCount = words.filter((word) =>
    negativeWords.includes(word)
  ).length;

  // Adjust based on word sentiment (max ±0.3)
  adjustment += Math.min(positiveWordCount * 0.1, 0.3);
  adjustment -= Math.min(negativeWordCount * 0.1, 0.3);

  // Check for engagement (questions and exclamations)
  const questionMarks = (feedback.match(/\?/g) || []).length;
  const exclamationMarks = (feedback.match(/!/g) || []).length;

  // Only add small bonus for reasonable engagement (max 0.2)
  if (questionMarks + exclamationMarks <= 3) {
    adjustment += Math.min((questionMarks + exclamationMarks) * 0.05, 0.2);
  }

  // Check for emojis and their sentiment
  const positiveEmojis = (feedback.match(/[😊😄😃😀😁👍❤️😋😍]/g) || []).length;
  const negativeEmojis = (feedback.match(/[😠😡👎💔😞😢😭😤]/g) || []).length;

  // Adjust based on emoji sentiment (max ±0.2)
  adjustment += Math.min(positiveEmojis * 0.1, 0.2);
  adjustment -= Math.min(negativeEmojis * 0.1, 0.2);

  // Add very small random adjustment (max ±0.1)
  const randomAdjustment = (Math.random() - 0.5) * 0.2;
  adjustment += randomAdjustment;

  // Apply the adjustment to the score
  score = Math.min(Math.max(score + adjustment, 1), 5);

  // Round to nearest integer for Solidity compatibility
  return Math.round(score);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
    },
  });
}
