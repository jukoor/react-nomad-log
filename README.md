# Nomad Log - Your Personal Travel Tracker

Nomad Log is a responsive React application built using the Material-UI framework. It offers users a modern platform to track their visited countries, countries they have lived in, and countries they plan to visit, all in one place. With Google authentication, users can create and share profiles easy and secure.

![](https://github.com/jukoor/react-nomad-log/blob/main/NomadLog_Screenshot.png)

[Watch Videopreview](https://github.com/jukoor/react-nomad-log/blob/main/NomadLog_Screenplay.mp4)

## Highlights

- 🔥 **Key Tools**: [Vite](https://github.com/vitejs/vite) + [React](https://github.com/facebook/react) + [TypeScript](https://github.com/microsoft/TypeScript) + [amCharts 5 ](https://www.amcharts.com/)
- 🎨 **UI**: Material UI + SCSS + Responsive
- 🔒 **Authentication**: Google Firebase Authentication
- ☁️ **Datastorage**: Google Firestore (NoSQL DB)
- 🛰️ **State Management**: Redux

## Features

### Map

- World map with capitals and states, powered by [amCharts 5 ](https://www.amcharts.com/)
- Toggle countries on multiple lists: Visited, Lived In, Bucket List
- Display detailed information about each country, provided by [REST Countries](https://restcountries.com/)
- Zoom in on countries to show their states
- Switch between map and globe view

### Profile

- User profile with bio and travel stats
- Continents visited
- 3 country lists in data grids with action buttons

### Settings

- Update user profile

## Getting Started

To run the application locally:

1.  Clone this repository to your local machine.
2.  Install dependencies using `npm install`.
3.  Set up a Firebase project and configure your Firebase credentials. [HOW TO](https://firebase.google.com/docs/web/setup)
4.  Enable Google authentication in your Firebase project.
5.  Update Firebase configuration in `src/config/firebaseConfig.tsx`.
6.  Run the application using `npm run dev`.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/jukoor/react-nomad-log/blob/main/LICENCE.txt) file for details.
