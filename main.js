const canvas = document.getElementById('canvas')
canvas.style.backgroundColor = 'rgba(10,50,0,.5)'
const ctx = canvas.getContext('2d')
const gravity = .5

// let x = canvas.clientWidth
// let y = canvas.clientHeight

class Player {
    constructor(){
        this.positon = {
            x: -5,
            y: 500
        }
        this.velocity = {
            x: 0,
            y: 2
        }
        this.width = 30,
        this.height = 30
    }


draw(){
    ctx.fillStyle = 'red'
    ctx.fillRect(this.positon.x, this.positon.y, this.width, this.height)
}

update(){
    this.draw()
    //adds y parameter with velocity
    this.positon.y += this.velocity.y
    this.positon.x += this.velocity.x
    
        //    10      +    30       +     2           <=   600
    // if(this.positon.y + this.height + this.velocity.y <= canvas.height/2)
    if(this.positon.y + this.height + this.velocity.y <= canvas.height)
    {
        this.velocity.y += gravity
    }
    else{
        this.velocity.y = 0
    }
}

}


class Platform {
    constructor({x,y}){
        this.positon = {
            x,
            y
        }
        this.width  = 200
        this.height = 20
    }

    draw(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.positon.x, this.positon.y, this.width, this.height)
    }
}
const playerOne = new Player()
// const platform = new Platform()
const platforms = [new Platform({x:200, y:400}),new Platform({x:500, y:500})]


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0
let showScore = document.querySelector('.score')
let score = 0
// let timer = 10
const timer = document.querySelector('.timerHTML')


function countDown(num){
    do{
        
 
        num--
        timer.innerHTML = `timer: ${num}`
        // console.log(num)
    }
    while(num > 0)


}





function animate () {
    // callbacks function animate
    requestAnimationFrame(animate)
    
    ctx.clearRect(0,0,canvas.width, canvas.height)

    //loops playerOne.update() for infinite times
    playerOne.update()
   
platforms.forEach((platform)=>{
    platform.draw()

})



// PLAYER POSITION X CANT GO BELOW 50 PIXELS AND CANT GO PAST 500 PIXELS
    if(keys.right.pressed && playerOne.positon.x < 500) {
        playerOne.velocity.x = 5
    }
    else if(keys.left.pressed && playerOne.positon.x > 50){
        playerOne.velocity.x = -5
    }
    else playerOne.velocity.x = 0

    
    // PLATFOMRS MOVE 3px TO LEFT WHEN RIGHT KEY IS PRESSSED
    if(keys.right.pressed){
        platforms.forEach((platform)=>{
            // platform.draw()
            
            scrollOffset += 5
            platform.positon.x -= 3
            
        })
        // if playerOne position x goes below score. keep score as score
        
        score = playerOne.positon.x
        // score++
        if(score == playerOne.positon.x){
            
            showScore.innerHTML = `Score:${score}`
        }
        else if(playerOne.positon.x < score){
            
        }
    
    }
    // PLATFOMRS MOVE 3px TO RIGHT WHEN LEFT KEY IS PRESSSED
    if(keys.left.pressed){
        platforms.forEach((platform)=>{
            // platform.draw()
            platform.positon.x += 3
            
        })
    }
    // ADDS SCORE BUT DECREASED WHEN LEFT.PRESSED    


    //PLATFORM COLLISION DETECTION.  PLAYER LANDS ON PLATFORM AND GETS OFF PLATFORM
    
platforms.forEach((platform)=>{
    platform.draw()

    if(playerOne.positon.y + playerOne.height <= platform.positon.y 
        && playerOne.positon.y + playerOne.height + playerOne.velocity.y >= platform.positon.y
        && playerOne.positon.x + playerOne.width >= platform.positon.x 
        && playerOne.positon.x  <= platform.positon.x + platform.width){
            playerOne.velocity.y = 0
        }
    })
}
animate()

window.addEventListener('keyup', ({keyCode}) =>{
    // console.log(keyCode)
    switch (keyCode){
        case 65: 
        keys.left.pressed = false
        break;

        case 68: 
        keys.right.pressed = false

        break

        case 83: 
        // playerOne.velocity.y += 1
        break

        case 87: 
        // playerOne.velocity.y -= 15
        break
    }

})

window.addEventListener('keydown', ({keyCode}) =>{
    // console.log(keyCode)
    switch (keyCode){
        case 65: 
        keys.left.pressed = true

        break;

        case 68: 
        keys.right.pressed = true
        break

        case 83: 
        // playerOne.velocity.y += 1
        break

        case 87: 
        playerOne.velocity.y -= 15
        break
    }

})