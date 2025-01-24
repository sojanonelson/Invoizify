// import React, { useEffect, useState } from 'react';
// import { screen } from 'electron'; // Electron's screen module

// const ScreenOverlay = () => {
//   const [screenInfo, setScreenInfo] = useState({ width: 0, height: 0 });

//   // Function to get screen size
//   const getScreenSize = () => {
//     const primaryDisplay = screen.getPrimaryDisplay();
//     const { width, height } = primaryDisplay.workAreaSize;
//     return { width, height };
//   };

//   useEffect(() => {
//     // Fetch screen size and update state
//     const screenSize = getScreenSize();
//     setScreenInfo(screenSize);
//   }, []);

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
//         color: 'white',
//         fontSize: '2rem',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 9999, // Ensures this is the top layer
//         pointerEvents: 'none', // Allows interaction with elements underneath
//       }}
//     >
//       <h1>Screen Information</h1>
//       <p>
//         <strong>Width:</strong> {screenInfo.width}px
//       </p>
//       <p>
//         <strong>Height:</strong> {screenInfo.height}px
//       </p>
//     </div>
//   );
// };

// export default ScreenOverlay;
