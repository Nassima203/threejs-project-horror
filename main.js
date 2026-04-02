import * as THREE from 'three';
// On ajoute l'import des contrôles
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';


// 1. La Scène (le monde)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505); // Un fond très sombre pour l'ambiance

// 2. La Caméra (Vision 3D)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 8); // On recule la caméra pour voir la chambre

// 3. Le Rendu (Renderer)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Indispensable pour les ombres !
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate); // On demande au navigateur de redessiner
    renderer.render(scene, camera); // On affiche la scène
}

animate(); // On lance la boucle d'animation

// Création d'un petit cube de test
const geometry = new THREE.BoxGeometry(1, 1, 1);
//const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Un cube vert
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

// Ajout d'une petite lumière pour y voir quelque chose
const light = new THREE.AmbientLight(0xffffff, 1); // Lumière blanche partout
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Ajoute un effet d'inertie fluide

// Le Sol
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }); // Gris clair 

const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x = -Math.PI / 2; // On le couche à plat
floor.receiveShadow = true;      // Important pour les ombres portées !
scene.add(floor);

// Géométrie : Largeur 10, Hauteur 5, Épaisseur 0.1
const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);

// Positionnement : 
// On le monte de 2.5 (la moitié de sa hauteur) pour qu'il soit posé SUR le sol
// On le recule de 5 (le bord du sol)
backWall.position.set(0, 2.5, -5); 

scene.add(backWall);

// --- MUR DE GAUCHE ---
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-5, 2.5, 0); // On le décale à gauche (-5 sur X)
leftWall.rotation.y = Math.PI / 2; // On le fait pivoter de 90 degrés
scene.add(leftWall);


