# Multi-Step Quiz Application

This is a dynamic multi-step quiz application that fetches quiz questions and data from [Contentful CMS](https://www.contentful.com/). The user can navigate through different quiz steps, answer questions, and receive a result at the end. The app also includes error handling in case data is not loaded correctly.

## Features

- **Dynamic question loading**: Questions and answers are dynamically loaded from Contentful CMS.
- **Multi-step navigation**: The quiz consists of multiple steps, and each step may contain one or more questions.
- **Various question types**: The quiz supports multiple choice and open-ended questions.
- **Progress tracking**: A progress bar shows the user's progress through the quiz.
- **Error handling**: Displays an error message if the data cannot be loaded or if there is an issue with the server.
- **Results analysis**: Once the quiz is completed, users can see the number of correct answers, their score percentage, and an analysis of their performance.

## Tech Stack

- **Frontend**: React.js
- **Styling**: CSS Modules
- **API Integration**: Contentful CMS (for quiz data)
- **Charts**: Recharts (for displaying results visually)
- **State Management**: React hooks (`useState`, `useEffect`)
- **Error Handling**: Axios error handling

## Setup Instructions

### Prerequisites

1. NPM or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quiz-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. To start the development server, run:

   ```bash
   npm start
   ```

2. Open your browser and go to `http://localhost:5173` to view the quiz application.

### Build the Application

To build the project for production, run:

```bash
npm run build
```
