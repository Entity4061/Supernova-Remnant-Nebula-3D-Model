// Animation loop
let elapsedTime = 0;
const duration = 5; // Duration of the animation in seconds

function animate() {
    requestAnimationFrame(animate);

    elapsedTime += 0.01;
    const t = Math.min(elapsedTime / duration, 1);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = initialPositions[i * 3] * (1 - t) + targetPositions[i * 3] * t;
        positions[i * 3 + 1] = initialPositions[i * 3 + 1] * (1 - t) + targetPositions[i * 3 + 1] * t;
        positions[i * 3 + 2] = initialPositions[i * 3 + 2] * (1 - t) + targetPositions[i * 3 + 2] * t;
    }

    particles.attributes.position.needsUpdate = true;

    if (elapsedTime < duration) {
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
    }

    composer.render();
}
animate();

// Movement controls
const moveSpeed = 2;
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            camera.position.z -= moveSpeed;
            break;
        case 'ArrowDown':
            camera.position.z += moveSpeed;
            break;
        case 'ArrowLeft':
            camera.position.x -= moveSpeed;
            break;
        case 'ArrowRight':
            camera.position.x += moveSpeed;
            break;
    }
});
