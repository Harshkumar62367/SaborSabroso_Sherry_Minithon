# Sabor Sabroso - Blockchain-Powered Restaurant Feedback System 🍽️

A modern, decentralized restaurant feedback system that leverages [Sherry](https://sherry.social/) technology to provide transparent and immutable customer reviews. Built with Next.js, Sherry and integrated with the Avalanche blockchain network.

## 🌟 Features

- **Decentralized Feedback System**: Store restaurant reviews and ratings on the blockchain
- **Smart Contract Integration**: Secure and transparent feedback storage using Solidity smart contracts
- **Real-time Updates**: Update your feedback and ratings anytime
- **Sentiment Analysis**: Algorithm to analyze feedback sentiment from your feedback
- **Modern UI/UX**: Beautiful, responsive interface thanks to Sherry Miniapps support.
- **Blockchain Integration**: Powered by Avalanche Fuji testnet

## Idea

Idea is to create MiniApps that can be attached to restaurant profiles on platforms like X or other social media, allowing customers to provide feedback and ratings for food and services. By using Avalanche Blockchain, we can securely save feedback messages and ratings directly on the blockchain, making them more trustworthy. 

Once fully developed, this app will serve as a one-stop platform for generating these MiniApps for restaurants and linking them to X. Restaurant owners will authenticate on the homepage, fill in some details, and create a unique Sherry link, which can be added to an X tweet and pinned. After visiting the restaurant, customers can visit the restaurant’s X profile to submit feedback. Using Sherry Actions’ actionFlow (with dynamic actions), in future, we will reward feedback providers with custom tokens as appreciation, which can be redeemed for discounts on future visits. We also plan to implement a custom rendering of the average rating on the MiniApp frontend once this feature is available in the Sherry SDK. I will continue development of this app beyond the Minithon to enhance the app further with the database addition once the hackathon ends.

## 🔗 Important Links

- [Live Demo](https://saber-sabroso-sherry.vercel.app/)
- [Smart Contract](https://subnets-test.avax.network/c-chain/address/0x9d1E517c84DF0A7672DA68784436813ae96b5FA8)
- [Sherry MiniApp](https://app.sherry.social/action?url=https://saber-sabroso-sherry.vercel.app/api/rating-app)
- [Metadata file](https://saber-sabroso-sherry.vercel.app/api/rating-app)

## 📝 Smart Contract Features

- Store feedback with ratings (1-5 scale)
- Update existing feedback and ratings
- Calculate average ratings
- Track total feedback count
- Retrieve user-specific feedback
- Event emission for all state changes


**Note: Play with smart contract here - [Contract Link](https://subnets-test.avax.network/c-chain/address/0x9d1E517c84DF0A7672DA68784436813ae96b5FA8?tab=code).**

`Contract is verified on Avalanche Fuji Testnet`


## 🚀 Getting Started with your local setup

1. Clone the repository:

```bash
git clone https://github.com/Harshkumar62367/SaberSabroso_Sherry_Minithon.git
cd SaberSabroso_Sherry_Minithon
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Submit [http://localhost:3000/api/rating-app](http://localhost:3000/api/rating-app) as action URL to [Sherry App](https://app.sherry.social/home)



## 🔮 Future Scope

- **Advance backend & customization**: Custom backend for creating new mini sherry links just by clicking a few buttons.
- **Token Integration**: Implement reward tokens for reviewers once you submit the feedback. Will have a actionFlow, as once you submit, it will reward out custom tokens to you, that you can use to get some discount next time.
- **Analytics Dashboard**: Detailed insights and analytics for restaurant owners.
- **AI-Powered Insights**: Enhanced sentiment analysis and trend detection (Further in future)
- **Restaurant Profiles**: Detailed restaurant information and menu integration on the website main page. 

## 💡 Potential Impact 

- **Transparency**: Immutable and verifiable customer feedback
- **Trust**: Enhanced credibility through blockchain verification
- **Engagement**: Increased customer participation in feedback
- **Innovation**: Pioneering blockchain integration in the restaurant industry
- **Data Security**: Secure storage of customer feedback
- **Business Intelligence**: Valuable insights for restaurant improvement
