import './style.scss'
import * as THREE from 'three'

import { gsap } from 'gsap'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const textureLoader = new THREE.TextureLoader()

const canvas = document.querySelector('canvas.webgl')
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'


import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import fragmentShaderFloor from './shaders/fragment-floor.glsl'

const scene = new THREE.Scene()
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0) // m/s²
})
// scene.background = new THREE.Color( 0xffffff )
// const loadingBarElement = document.querySelector('.loading-bar')
// const loadingBarText = document.querySelector('.loading-bar-text')
// const loadingManager = new THREE.LoadingManager(
//   // Loaded
//   () =>{
//     window.setTimeout(() =>{
//       gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
//
//       loadingBarElement.classList.add('ended')
//       loadingBarElement.style.transform = ''
//
//       loadingBarText.classList.add('fade-out')
//
//     }, 500)
//   },
//
//   // Progress
//   (itemUrl, itemsLoaded, itemsTotal) =>{
//     const progressRatio = itemsLoaded / itemsTotal
//     loadingBarElement.style.transform = `scaleX(${progressRatio})`
//
//   }
// )
//
const gtlfLoader = new GLTFLoader()
//
// const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
// const overlayMaterial = new THREE.ShaderMaterial({
//   depthWrite: false,
//   uniforms:
//     {
//       uAlpha: { value: 1 }
//     },
//   transparent: true,
//   vertexShader: `
//         void main()
//         {
//             gl_Position = vec4(position, 1.0);
//         }
//     `,
//   fragmentShader: `
//   uniform float uAlpha;
//         void main()
//         {
//             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
//         }
//     `
// })
//
// const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
// scene.add(overlay)


const invisibleMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0, depthWrite: false})


const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    },
    uRotation: {
      value: 0



    },
    uValueA: {
      value: 3
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    }
  }
})

const floorMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShaderFloor,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    },
    uRotation: {
      value: 0



    },
    uValueA: {
      value: 3
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    }
  }
})


let sceneGroup, mixer, gltfVar, egg, bit, shell, floor, segments
gtlfLoader.load(
  'hand.glb',
  (gltf) => {
    console.log(gltf)
    gltfVar = gltf
    gltf.scene.scale.set(3,3,3)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y -= 3
    scene.add(sceneGroup)
    segments = []

    // egg = gltf.scene.children.find((child) => {
    //   return child.name === 'egg'
    // })
    //
    // floor = gltf.scene.children.find((child) => {
    //   return child.name === 'floor'
    // })
    //
    // bit = gltf.scene.children.find((child) => {
    //   return child.name ===  'Sphere_cell024'
    // })
    //
    // console.log(bit)
    //
    // floor.material = floorMaterial
    //
    // scene.traverse( function( object ) {
    //   // console.log(object)
    //   if (object.material && object.material.name.includes('2')){
    //     segments.push(object)
    //     object.material = shaderMaterial
    //   }
    //
    //   if (object.material && object.material.name.includes('1')){
    //     console.log('hiya')
    //     shell = object.material
    //
    //   }

// } )


  }
)


const geometry = new THREE.CylinderGeometry( .5, .5, .2, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const materialH = new THREE.MeshBasicMaterial( {color: 0xffffFF} );
const materialT = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cylinder = new THREE.Mesh( geometry, [material, shaderMaterial, shaderMaterial] );
scene.add( cylinder );

cylinder.position.z -=6.2
cylinder.position.x -=2
cylinder.position.y -=.5


const cylinderBody = new CANNON.Body({
  mass: 5, // kg
  shape: new CANNON.Cylinder( .5, .5, .2, 32)
})

const cylinderBodyH = new CANNON.Body({
  mass: 5, // kg
  shape: new CANNON.Cylinder( .5, .5, .2, 32)
})






cylinderBody.position.z -=6.2
cylinderBody.position.x -=2
cylinderBody.position.y -=.5

world.addBody(cylinderBody)

const halfExtents = new CANNON.Vec3(1, 1, 1)
const boxShape = new CANNON.Box(halfExtents)
const thumbBody = new CANNON.Body({ mass: 0, shape: boxShape })


thumbBody.position.z -=6.2
thumbBody.position.x -=2
thumbBody.position.y -=1.6

world.addBody(thumbBody)





const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
})

groundBody.position.y -=5.5
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
world.addBody(groundBody)

let objectsToUpdate =[{
  mesh: cylinder,
  body: cylinderBody
}]

// window.addEventListener( 'pointerup', onClick, false )
let ready = true
function onClick(side) {



  event.preventDefault()

  console.log(cylinderBody)

  if(ready){
    ready = false
  cylinderBody.angularVelocity.z += 100
  if(side === 'heads'){
      shaderMaterial.uniforms.uValueA.value = 4
  }

  if(side === 'tails'){
      shaderMaterial.uniforms.uValueA.value = 3
  }

}

  if(gltfVar.animations[0]){
    mixer = new THREE.AnimationMixer(gltfVar.scene)
    console.log(mixer)
    gltfVar.animations.map(x => {
      const action = mixer.clipAction(x)
      action.clampWhenFinished = true
      action.setLoop(THREE.LoopOnce, 1)
      action.play()
    })


  }


}


document.getElementById('heads').addEventListener('click', function (e) {
  onClick('heads')
});


document.getElementById('tails').addEventListener('click', function (e) {
  onClick('tails')
});


document.getElementById('again').addEventListener('click', function (e) {
  ready=true
  cylinderBody.position.z = -6.2
  cylinderBody.position.x = -2
  cylinderBody.position.y = -.5

});




const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{



  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2 ))


})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -6.2
camera.position.y = 15
camera.position.z = 30
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000, 1)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const light = new THREE.AmbientLight( 0x404040 )
scene.add( light )
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 )
scene.add( directionalLight )


// const cannonDebugger = new CannonDebugger(scene, world, {
//   // options...
// })


const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>{

  if ( mixer ) mixer.update( clock.getDelta() )
  const elapsedTime = clock.getElapsedTime()

  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime
  world.step(1/60, deltaTime, 3)

  // Update controls
  // controls.update()

  for(const object of objectsToUpdate){
    object.mesh.position.copy(object.body.position)
    object.mesh.quaternion.copy(object.body.quaternion)
  }


    camera.lookAt(cylinder.position)


  // cannonDebugger.update()

  shaderMaterial.uniforms.uTime.value = elapsedTime
  floorMaterial.uniforms.uTime.value = elapsedTime

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
