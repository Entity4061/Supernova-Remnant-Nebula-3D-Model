// supernovaAnimation.js
function animateParticlesToSupernova(particles) {
    const positions = particles.attributes.position.array;
    const targetPositions = []; // Array to store target positions based on the image

    // Load the image and extract target positions
    const img = new Image();
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a2/SN1994D.jpg';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height).data;
        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                const index = (y * img.width + x) * 4;
                const alpha = imageData[index + 3];
                if (alpha > 128) { // Adjust threshold as needed
                    const px = (x / img.width - 0.5) * 200; // Scale to fit your scene
                    const py = (0.5 - y / img.height) * 200;
                    const pz = (Math.random() - 0.5) * 50; // Add some depth
                    targetPositions.push(px, py, pz);
                }
            }
        }

        // Animate particles to target positions
        const speed = 0.02; // Adjust speed as needed
        function animate() {
            requestAnimationFrame(animate);
            for (let i = 0; i < particles.count; i++) {
                const ix = i * 3;
                positions[ix] += (targetPositions[ix] - positions[ix]) * speed;
                positions[ix + 1] += (targetPositions[ix + 1] - positions[ix + 1]) * speed;
                positions[ix + 2] += (targetPositions[ix + 2] - positions[ix + 2]) * speed;
            }
            particles.attributes.position.needsUpdate = true;
        }
        animate();
    };
}
