
# Nordic Name Generator

## Description

**Nordic Name Generator** is a web application that generates random Nordic names. The application offers users the ability to choose the gender of the name (male, female, unisex) and displays the corresponding runes for the generated name.

The application uses data scraped from a website about Nordic names, allowing it to generate names along with their meanings. The names are categorized into three groups: **male**, **female**, and **unisex**. Additionally, the application can display the name in its runic form.

## Features

- **Random Name Generation**: The application generates random Nordic names from three categories (male, female, unisex).
- **Gender Selection**: You can choose whether you want a male, female, or unisex name.
- **Name Meanings**: Each generated name has an associated meaning, which is displayed next to the name.
- **Runes**: The application converts the generated name into its runic form, displaying it alongside the Latin alphabet name.
- **Refresh Button**: You can click a button to generate a new random name.

## Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/your-repository.git
   ```

2. **Install dependencies**:
   Install all required dependencies using npm or yarn.
   ```
   npm install
   # or
   yarn install
   ```

3. **Run the application**:
   To run the application in development mode:
   ```
   npm run dev
   # or
   yarn dev
   ```

## Technologies

- **React**: Used for building the user interface.
- **Remix**: Framework for building web applications.
- **Cheerio**: Used for scraping data from HTML.
