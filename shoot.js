AFRAME.registerComponent("bullets",{
    init:function(){
        this.shootBullets()
    },
    shootBullets:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var bullet=document.createElement("a-entity")
                bullet.setAttribute("geometry",{primitive:"sphere",radius:0.1})
                bullet.setAttribute("material",{color:"black"})
                
                var cam=document.querySelector("#camera-rig")
                pos=cam.getAttribute("position")

                bullet.setAttribute("position",{x:pos.x-0.2,y:pos.y+1,z:pos.z-0.5})

                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                console.log(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-50))

                bullet.setAttribute("dynamic-body",{shape:"sphere",mass:50})
                bullet.addEventListener("collide",this.removeBullet)

                var scene=document.querySelector("#scene")
                
                scene.appendChild(bullet)
            }
        })
    },
    removeBullet:function(e){
        var element=e.detail.target.el
        var box=e.detail.body.el
        if(box.id.includes("box")){
            box.setAttribute("material",{transparent:true})

            var impulse=new CANNON.Vec3(-2,2,1)
            var worldPoint=new CANNON.Vec3().copy(box.getAttribute("position"))
            box.body.applyImpulse(impulse,worldPoint)

            element.removeEventListener("collide",this.shoot)
            var scene=document.querySelector("#scene")
            scene.removeChild(element)
        }
    },
})