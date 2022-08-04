<img src="./readme/title1.svg"/>

<div align="center">

> GP, also known as gold piece, is a website where the user can store his financial records and view them ordered in a table and charts. Alongside the finance keeping section is the crypto wallet section where the user can deposit and withdraw coins.  


</div>

<br><br>


<img src="./readme/title2.svg"/>

> GP is an all-in-one platform for tracking your finances. It’s a simple, easy-to-use, and encompases all of the essential features of a personal finance app as well as a crypto wallet.
> 
> There is no need to download any software to use GP. You can use GP on your favorite browser.
>
> GP uses graphs to visualize your financial data. It’s easy to see how your money is being used.

### User Stories
- As a user, I want to have a quick and easy way to track my finances.
- As a user, I want to be able to easily add new records to my financial tracker.
- As a user, I want to have a graph that shows my financial data over time.
- As a user, I want to have a wallet close by where I can also track my crypto currencies.
- As a user, I want to be able to easily add and or withdraw coins from my wallet.


- As a support, I want to be able to easily keep track of my customers' complaints and concerns.

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Landing  | Home  |
| -----------------| -----|
| <img src="./readme/figma/landing.jpg"/> | <img src="./readme/figma/home.jpg"/> |

| Login  | Signup  |
| -----------------| -----|
| <img src="./readme/figma/login.jpg"/> | <img src="./readme/figma/signup.jpg"/> |

| Charts  | input  |
| -----------------| -----|
| <img src="./readme/figma/charts.jpg"/> | <img src="./readme/figma/input.jpg"/> |

| Withdraw  | Deposit  |
| -----------------| -----|
| <img src="./readme/figma/withdraw.jpg"/> | <img src="./readme/figma/deposit.jpg"/> |

| Chat  | Support  |
| -----------------| -----|
| <img src="./readme/figma/chat.jpg"/> | <img src="./readme/figma/support.jpg"/> |


<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack GP uses:

- The [Node.js runtime environment](https://nodejs.org/en/about/) that runs on the V8 engine is used to run the backend environment.
- The database used is [MongoDB](https://www.mongodb.com/). This NoSQL database program saves data in a JSON format and is very fast, scalable, and flexible.
- [Express.js](https://expressjs.com/) is a back end web application framework for Node.js. It's a layer built on the top of the Node.js that helps manage servers and routes
- [React.js](https://fonts.google.com/specimen/Work+Sans)is the front-end JavaScript library used for building user interfaces based on UI components.



<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes built with figma, the implementation of the app is shown as below, these are screenshots from the real app

| Landing  |
| -----------------|
| <img src="./readme/project-images/landing.png"/> |

| Home  | Input  |
| -----------------| -----|
| <img src="./readme/project-gifs/table.gif"/> | <img src="./readme/project-gifs/input.gif"/> |

| Login  | Signup  |
| -----------------| -----|
| <img src="./readme/project-gifs/login.gif"/> | <img src="./readme/project-gifs/signup.gif"/> |

| Bar Chart  | Daughnut Chart  |
| -----------------| -----|
| <img src="./readme/project-gifs/barchart.gif"/> | <img src="./readme/project-gifs/doughnut-chart.gif"/> |

| Deposit 1  | Deopsite 2  | Deopsite 3  |
| -----------------| -----|-----|
| <img src="./readme/project-gifs/deposit.gif"/> | <img src="./readme/project-gifs/deposit-1.gif"/> | <img src="./readme/project-gifs/deposit-2.gif"/> |

| Withdraw  |
| -----------------|
| <img src="./readme/project-gifs/withdraw.gif"/> |

| Support  | User Receive  | User Send  |
| -----------------| -----|-----|
| <img src="./readme/project-gifs/support-message-receive.gif"/> | <img src="./readme/project-gifs/user-message-receive.gif"/> | <img src="./readme/project-gifs/user-message-send.gif"/> |



<br><br>
<img src="./readme/title6.svg"/>

> To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo.
   ```sh
   git clone https://github.com/elie-majdalani/GP.git
   ```
2. Install NPM packages on the frontend and backend.
   ```sh
   npm install
   ```
3. Create in your "/frontend/src" section create `config.json` and add your backend server url.
   ```js
   { "SERVER_URL":"http://127.0.0.1:4001" }
   ```
4. Creat firebase project
    - Create a new project in firebase
    - Enable the firestore database
      * Set in Rules "allow read, write : if true;"
    - From Project Settings 
      * In the 'General' section clickon 'Add app' and then get your firebase configuration
      * In the 'Service accounts' section generate a new private key in nodejs (will generate a .json file)


5. Create in your "/frontend/src/components" section `config.json` and add your generated firebase configuration.
   ```js
    {
      "apiKey": 
      "authDomain": 
      "projectId": 
      "storageBucket": 
      "messagingSenderId": 
      "appId":
    }
   ```

6. In your "/backend" section add your generated .json file as `config.json`.
   ```js
    {
    "type": 
    "project_id": 
    "private_key_id": 
    "private_key":
    "client_email": 
    "client_id":
    "auth_uri": 
    "token_uri": 
    "auth_provider_x509_cert_url":
    "client_x509_cert_url":
    }
   ```

7. Create your Atlas cluster with collection "gp".

8. Create your .env file in your "/backend" section and add:
    ```js
    API_PORT= *your backend port here*

    MONGO_URI= *your mongo connection string here from Atlas*

    TOKEN_KEY= *JWT encryption key here*

    CRYPT_API= *cryptAPI key here (taken from cryptAPI when you register)*

    ETH_WALLET= *your eth wallet address here*

    ETH_PRIVATE_KEY=  *your eth private key here*

    PRETIXE_API_KEY= *Waxpeer key here (taken from Waxpeer support discord link: "https://discord.com/invite/Z4HzgSt" )*

    TRX_WALLET= *your tron wallet address here*

    SERVER_URL= *your backend server url here*
    ```

### Notes

  - All coins Deposite are handled by cryptAPI.

  - All ETH Withdraw is handled by Web3 (hardcoded on test net can be changed by changing the network).

  - TRX and USDT (trc20/usdt) (on the tron network) Withdraw are handled by Waxpeer.
