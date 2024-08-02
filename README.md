# Musical Web 2024 Project Showcase Site

## Features

- **3D Point Cloud Sphere:** A rotating sphere made of particles.
- **Scroll-Based Project Navigation:** Navigate through different project details by scrolling.
- **Audio Reactive Visualization:** The point cloud reacts to audio input from the user's microphone.

## Setup Instructions

### Prerequisites

- [Node.js] and npm 
- A text editor or IDE 

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   If you haven't already installed `three.js` via npm, run the following command:

   ```bash
   npm install three
   ```

3. **Run the Project**

   If you're working locally, you can use a simple HTTP server to run the project. For example, using Python's built-in server:

   ```bash
   python -m http.server
   ```

   Then, open your browser and navigate to `http://localhost:8000`.

### File Structure

- **index.html:** The main HTML file that includes the Three.js canvas and project container div.
- **script.js:** The JavaScript file containing all the Three.js logic, including the point cloud creation, 3D text rendering, and audio analysis.
- **mgsfont2.json:** The custom font used for rendering 3D text in the scene.

### Customizing the Project

- **Project Data:** You can add or modify the projects displayed by updating the `projectData` array in `script.js`.
- **3D Text:** Customize the 3D text by changing the text string in the `create3DText` function.
- **Audio Reactivity:** The audio reactivity is controlled by the Web Audio API and can be modified to create different visual effects based on microphone input.

### Dependencies

- [Three.js](https://threejs.org/) - A JavaScript 3D library that helps create and display animated 3D computer graphics in a web browser.
- [FontLoader](https://threejs.org/docs/#examples/en/loaders/FontLoader) - A Three.js addon for loading and using fonts in 3D scenes.
- [TextGeometry](https://threejs.org/docs/#examples/en/geometries/TextGeometry) - A geometry class for creating 3D text.

