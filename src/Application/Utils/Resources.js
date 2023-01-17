import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Application from '../Application.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter{
    constructor(sources){
        super()
        this.axesHelper = new THREE.AxesHelper(10)

        // setup
        this.application = new Application()
        this.scene = this.application.scene
        this.scene.add(this.axesHelper)

        this.sources = sources
        
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading(){
        for(const source of this.sources){
            if(source.type === 'gltf'){
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file

        this.loaded++

        if(this.loaded == this.toLoad){
            this.trigger('loaded')
        }
    }
}