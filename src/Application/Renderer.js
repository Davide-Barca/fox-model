import * as THREE from 'three'

import Application from "./Application.js";

export default class Renderer{
    constructor(){
        // setup
        this.application = new Application()
        this.sizes = this.application.sizes
        this.canvas = this.application.canvas
        this.camera = this.application.camera
        this.scene = this.application.scene

        this.setInstance()
    }

    setInstance(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 1
        this.renderer.setClearColor('#312A2A')
        console.log('renderer created')
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    update(){
        this.renderer.render(this.scene, this.camera.instance)
    }
}