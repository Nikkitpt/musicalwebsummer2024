const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const createPointCloud = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const sphereRadius = 10;
    const particleCount = 5000;

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.01 });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    return pointCloud;
};

const pointCloud = createPointCloud();
const originalVertices = pointCloud.geometry.attributes.position.array.slice();

camera.position.z = 15;

const onMouseWheel = (event) => {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.01;
    camera.position.z = Math.max(1, Math.min(50, camera.position.z));
};
window.addEventListener('wheel', onMouseWheel);

// Web Audio API setup
let audioContext, analyser, dataArray;

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    })
    .catch(err => {
        console.error('Error accessing microphone:', err);
    });

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    if (analyser) {
        analyser.getByteFrequencyData(dataArray);

        const vertices = pointCloud.geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            const displacement = dataArray[i % dataArray.length] / 512; // Scale down the effect
            vertices[i] = originalVertices[i] + displacement;
            vertices[i + 1] = originalVertices[i + 1] + displacement;
            vertices[i + 2] = originalVertices[i + 2] + displacement;
        }
        pointCloud.geometry.attributes.position.needsUpdate = true;
    }

    pointCloud.rotation.y += 0.001;
    pointCloud.rotation.x += 0.001;

    renderer.render(scene, camera);
};
animate();


const projectData = [
    {
        title: "Project Title 1",
        description: "Project description for project 1."
    },
    {
        title: "Project Title 2",
        description: "Project description for project 2."
    },
    // Add more projects here
];

const projectContainer = document.getElementById('project-container');

projectData.forEach(project => {
    const projectDetails = document.createElement('div');
    projectDetails.className = 'project-details';

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    projectDetails.appendChild(projectTitle);
    projectDetails.appendChild(projectDescription);
    projectContainer.appendChild(projectDetails);
});





