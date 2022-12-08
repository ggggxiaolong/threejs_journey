import { Experience } from "../experience";
import * as THREE from "three";

export class Fox {
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resource;
        this.time = this.experience.time;
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.model = this.resource.items["foxModel"]
        this.animations = this.model.animations;
        this.mixture = new THREE.AnimationMixer(this.model.scene)
        this.actions = []
        this.actions.push(this.mixture.clipAction(this.animations[0]))
        this.actions.push(this.mixture.clipAction(this.animations[1]))
        this.actions.push(this.mixture.clipAction(this.animations[2]))
        this.currentAction = this.actions[0]
        this.currentAction.play()
        this.model.scene.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model.scene);
        // this.scene.castShadow = true
        this.model.scene.traverse((child) => {
            child.castShadow = true;
        })
        if(this.debug.enable){
            this.debugFolder = this.debug.ui.addFolder("Fox")
            this.debugFolder.add(this, "playIdle")
            this.debugFolder.add(this, "playWalk")
            this.debugFolder.add(this, "playRun")
        }
    }

    update(){
        this.mixture.update(this.time.delta * 0.001)
    }

    playAction(index){
        const old = this.currentAction
        this.currentAction = this.actions[index]
        this.currentAction.reset()
        this.currentAction.play()
        this.currentAction.crossFadeFrom(old, 1)
    }

    playIdle(){
        this.playAction(0)
    }

    playWalk(){
        this.playAction(1)
    }

    playRun(){
        this.playAction(2)
    }
}
