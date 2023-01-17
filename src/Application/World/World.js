import * as THREE from 'three'

import Application from '../Application.js'

export default class World{
    constructor(){
        // setup
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources

        this.resources.on('loaded', () => {
            console.log('model caricate')
            this.setModel()
            this.setLights()

        })

    }

    setModel(){
        this.model = {}
        this.model.scene = this.resources.items.FoxModel.scene
        this.model.scene.rotation.y = Math.PI
        this.model.scene.scale.set(0.5, 0.5, 0.5)
        this.model.scene.position.y = -0.5
        this.scene.add(this.model.scene)
    }

    setLights(){
        this.lights = {}
        this.lights.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        this.lights.directionalLight.position.y = 5

        this.lights.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.lights.directionalLight, this.lights.ambientLight)

        // light helper
        this.lights.directionalLightHelper = new THREE.DirectionalLightHelper(this.lights.directionalLight)
        this.scene.add(this.lights.directionalLightHelper)

    }
}