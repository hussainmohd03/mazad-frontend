![header](/public/design-images/banner.png)

# MAZAD

## Date: 03/09/2025

### [MAZAD BACKEND REPO](https://github.com/hussainmohd03/mazad-backend) | [DEPLOYED VERSION]()

### By: [Hussain Ahmed](https://github.com/hussainmohd03) | [Manaf Hujairi](https://github.com/Manaf-10) | [Mohammed Alsaegh](https://github.com/MohamedAlsaegh) | [Maryam Ali Redha](https://github.com/maryamalihasanebrahim)

## **Description**
This project is a MERN stack Mazad clone, built with MongoDB, Express.js, React, and Node.js. The app allows users to browse, bid, and sell items through live auctions. Sellers can list products with details and images, while buyers can place bids in real time. The platform also includes user authentication, transaction history, and delivering a smooth auction experience similar to Mazad.

## **Key Features**
### **Live auctions** 
Users can view live auctions and place biddings on them; sockets reflect the change instantly. 

### **Watchlist** 
Users of Mazad can keep track of their favorite auctions via a watchlist feature. Once the auction is closed (meaning sold) it will be automatically removed and the user will be notified.

### **In-app notifications** 
Certain events in the application like edits to a users profile, an outbidding, or a successful bid trigger in-app notifications live.

### **Autobidding** 
On place bid, users can choose to turn on an autobidding feature which tops up the current highest bid with the chosen increment and places a bid on behalf of the current user.

### **Admin console** 
Alongside the regular user of Mazad, we accounted for admins to manage approving and rejecting products, see statistics about the website

### **Top up** 
Users can top up their balance in the app to place biddings on auctions

## **Technologies Used**

- Built in MERN (MongoDB, Express.js, React, Node.js) creatively directed using CSS

- Libraries and other technologies include [dayjs](https://day.js.org/), [recharts](https://recharts.org/en-US), [multer](https://www.npmjs.com/package/multer), [socket.io](https://socket.io/docs/v4/), and [emailjs](https://www.emailjs.com/).

- Designed in [Figma](https://www.figma.com/design/6Qd1w4GM21mcFWZkxZ3Pht/Mazad?node-id=0-1&t=UKvIVKRsOu3QsRXZ-1)

## **Planning & Inspiration**

Project planning commenced with the creation of a [Notion Planner](https://www.notion.so/Mazad-2562d10679d68003b85cd8988bd70bb2?source=copy_link) database where tasks were distributed according to entities assigned to each member of the group.

[Component Hierarchy Diagram](https://www.canva.com/design/DAGwokIeK7M/8g7vGFOHSABMzxOSa5yo2g/edit?utm_content=DAGwokIeK7M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) & ERD were amended throughout the project to accomodate extra features and updates.

### **Branding**

![branding board](/public/design-images/branding.png)

The branding of this project was directly influenced by the Mazad application as illustrated above to provide a cohesive clone in respect to the original.

### **Entity Relationship Diagram (ERD)**
The ERD below illustrates the database structure of the application, defining how entities relate to each other.

- USER: each user will have firstName, Lastname , email, password, a default avatar(image), type(role), balance, verified(as seller), and notifications.
- ITEMS: each item will have name, description, price, category, image (array), status(pending, approved or rejected).
- AUCTION: each auction will have itemId, ownerId(user as seller), startDate, endDate, status(upcoming, ongoing or closed), initialPrice, currentPrice, and winningBid.
- BIDDING: each bidding will have auctionId, userId, amount, and createdAt.
- AUTOBIDDING: each autobidding will have increment_amount, max_bid_amount, userId, and auctionId.
- TRANSACTION: each transaction will have sellerId(user as seller), BuyerId, itemId, price, and date.
- WATCHLIST: each watchlist will have auctionId and userId.

Relationships:
- User owns many items and each item belongs to one user.
- User can run many auctions and each auction is created by one user.
- User has a watchlist of auctions and a watchlist entry belongs to one user and one auction.
- User places many bids and each bid belongs to one user.
- User has many autobiddings and each autobidding belongs to one user (one autobidding in each auction).
- Auction lists one item and an item can appear in one and only one.
- Auction receives many bids and each bid belongs to one auction.
- Auction has one autobidding by each user and each autobidding is linked to one auction.
- Auction is contained in many users’ watchlists and each watchlist entry references one auction.
- A transaction comes from a closed auction and each transaction is tied to one auction/item.
- Bid belongs to one auction and an auction may have many bids.
- A transaction has a seller (user) and a buyer (user).

These relationships ensure a consistent flow of data across the entities to support the core functionality of the application and insure an organised and clean logic is being implemented.


![erd](/public/design-images/image.png)

## **Extra Features (implemented)**

- Autobidding
- In-app Notifications
- Email System

## **Future Enhancements**

- Dark & Light Theme Mode [(partially completed)](https://github.com/MohamedAlsaegh)
- Google Sign-up [(partially completed)](https://github.com/hussainmohd03)
- Login Limiter [(partially completed)](https://github.com/hussainmohd03)
- Chatbot [(partially completed)](https://github.com/hussainmohd03)
- Multi-language Options
- Payment Gateway
