// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Generate points with more extravagant patterns
const numPoints = 100000;
const points = new Float32Array(numPoints * 3);
for (let i = 0; i < numPoints; i++) {
    const phi = Math.random() * Math.PI * 2;
    const costheta = Math.random() * 2 - 1;
    const u = Math.random();

    const theta = Math.acos(costheta);
    const r = Math.cbrt(u);

    // Add some variation to the radius to create patterns
    const variation = Math.sin(5 * phi) * Math.cos(5 * theta) * 0.1;
    const x = (r + variation) * Math.sin(theta) * Math.cos(phi);
    const y = (r + variation) * Math.sin(theta) * Math.sin(phi);
    const z = (r + variation) * Math.cos(theta);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
}

// Create the point cloud geometry and material
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
const material = new THREE.PointsMaterial({ color: 0x888888, size: 0.01 });
const pointCloud = new THREE.Points(geometry, material);
scene.add(pointCloud);

// Position the camera and add controls
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    pointCloud.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
