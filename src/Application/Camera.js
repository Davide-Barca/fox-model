import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Application from './Application.js'

export default class Camera{
    constructor(){
        // Setup
        this.application = new Application()
        this.sizes = this.application.sizes
        this.time = this.application.time
        this.canvas = this.application.canvas
        this.scene = this.application.scene

        this.setInstance()
        this.setOrbitControl()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.z = 3
        this.instance.position.y = 1
        this.scene.add(this.instance)

        console.log('camera created')
    }

    setOrbitControl(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}