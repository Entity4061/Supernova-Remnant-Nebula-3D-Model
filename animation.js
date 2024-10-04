// Animation loop
let elapsedTime = 0;
const duration = 5; // Duration of the animation in seconds
let animationPhase = 0;

function animate() {
    requestAnimationFrame(animate);

    elapsedTime += 0.01;
    const t = Math.min(elapsedTime / duration, 1);

    if (animationPhase === 1) {
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = initialPositions[i * 3] * (1 - t) + targetPositions[i * 3] * t;
            positions[i * 3 + 1] = initialPositions[i * 3 + 1] * (1 - t) + targetPositions[i * 3 + 1] * t;
            positions[i * 3 + 2] = initialPositions[i * 3 + 2] * (1 - t) + targetPositions[i * 3 + 2] * t;
        }
    } else if (animationPhase === 2) {
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = targetPositions[i * 3] * (1 - t) + finalPositions[i * 3] * t;
            positions[i * 3 + 1] = targetPositions[i * 3 + 1] * (1 - t) + finalPositions[i * 3 + 1] * t;
            positions[i * 3 + 2] = targetPositions[i * 3 + 2] * (1 - t) + finalPositions[i * 3 + 2] * t;
        }
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
        case 'w':
            camera.position.z -= moveSpeed;
            break;
        case 's':
            camera.position.z += moveSpeed;
            break;
        case 'a':
            camera.position.x -= moveSpeed;
            break;
        case 'd':
            camera.position.x += moveSpeed;
            break;
        case 'ArrowRight':
            if (animationPhase === 0) {
                animationPhase = 1;
                elapsedTime = 0;
            } else if (animationPhase === 1) {
                animationPhase = 2;
                elapsedTime = 0;
            }
            break;
    }
});
