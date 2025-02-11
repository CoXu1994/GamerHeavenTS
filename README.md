# GamerHeaven

## Description

**GamerHeaven** is a web application that allows users to browse games, create wishlist and manage it for better tracking of games you want to own in future and similar. WishList allows to add games, view details of title ( game description, ratings, platform availablility etc.) and delete games on the list. You can use search function to find titles you are interested in by using global search bar or use categories subpage for more advanced filtering options.

All images and data used in this project comes from Rawg.io . Checkout more on https://rawg.io/apidocs.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [ToDo](#todo)
-   [Technology/Tools](#technologytools)
-   [Previous Version Technology/Tools](#previous-version-technologytools)
-   [Demo](#demo)
-   [Previous version Demo](#previous-version-demo)
-   [Author](#author)

## Installation

To run it locally, follow these steps:

1. You have to make new account on rawg.io to get apikey.

    Go to https://rawg.io/apidocs. Press `Get API Key` button and create new account.

2. Clone the repository with the application source code to your computer:

    ```
    git clone https://github.com/CoXu1994/GamerHeaven.git
    ```

3. Install Dependencies: Navigate to the application directory and install the required dependencies using npm:

    ```
    npm install
    ```

4. Create new file `.env`. Inside should look like this:

    ```
    VITE_API_KEY= $Insert_your_apiKey_Here$
    VITE_API_HOST= api.rawg.io
    ```

## Usage

Run the Application: After installing the dependencies, you can start the application locally using the following command:

    npm run dev

## Todo

-   **Add account support** - each account could have own settings, wishlists etc.

-   **Add memory of previous visited sites** - unload connection with api making less requests by preserving already downloaded data

-   **Add views for multiple devices** - adjustements for styles to create separate views depending on device screen size. Need to be 1st.

-   **Code cleaning** - at the moment all styling is done in code using Material UI components. Create separate files for styles alone, separate some fragments to other components and reduce repetition for better code clarity. Need to be done 2nd.

## Technology/Tools

-   **React**
-   **TypeSript**
-   **Material-UI**
-   **Axios**
-   **ESlint**
-   **Vite**
-   **LocalStorage**

## Previous version Technology/Tools

-   **JavaScript**
-   **SASS**
-   **React-Query**
-   **Supabase**

## Demo

https://gamerheavents.netlify.app

## Previous version Demo

https://fascinating-longma-941680.netlify.app - wishlist subpage and functions are not working because of supabase killing unused database every now and then

## Author

Mateusz Radomski
