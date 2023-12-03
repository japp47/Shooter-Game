const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEl = document.querySelector('#scoreEl') 
const modalEl = document.querySelector('#modalEl') 
const modalScoreEl = document.querySelector('#modalScoreEl')
const buttonEl = document.querySelector('#buttonEl')
const startButtonEl = document.querySelector('#startButtonEl')
const startModalEl = document.querySelector('#startModalEl')
const volumeUp = document.querySelector('#volumeUp')
const volumeOff = document.querySelector('#volumeOff')

class Player {
    constructor(x,y,radius,color)
    {
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity = {
            x: 0,
            y: 0
        }
        this.powerUp
    }


    draw()
{
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
}
update(){
    this.draw()
    const friction = 0.99

    this.velocity.x *= friction
    this.velocity.y *= friction

    if(this.x + this.radius + this.velocity.x <= canvas.width && 
        this.x - this.radius + this.velocity.x>= 0){
    this.x += this.velocity.x
    }
    else {
        this.velocity.x = 0
    }
    if(this.y + this.radius + this.velocity.y <= canvas.height &&
        this.y - this.radius + this.velocity.y >=0){
    this.y += this.velocity.y
    }
    else {
        this.velocity.y = 0
    }
}
}

class Projectile {
    constructor(x, y, radius, color, velocity)
    {
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }
    
    draw()
{
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
}
update(){
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    
}
}
class Enemy {
    constructor(x, y, radius, color, velocity)
    {
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
        this.type = 'Linear'
      
        this.radians = 0
        this.center = {
            x,
            y
        }

        if(Math.random() < 0.4)
        {
            this.type = 'Homie'
        
        if(Math.random() < 0.4)
        {
            this.type = 'Spinning'

            if(Math.random() < 0.4)
        {
            this.type = 'Homie Spinning'
        }
    }
}
}
    
    draw() 
{
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
}
update(){
    this.draw()

    if(this.type === 'Spinning'){
    this.radians += 0.1

    this.center.x += this.velocity.x
    this.center.y += this.velocity.y

    this.x = this.center.x + Math.cos(this.radians)*25
    this.y = this.center.y + Math.sin(this.radians)*25
    }

    else if(this.type === 'Homie'){
    const angle = Math.atan2(player.y - this.y, player.x - this.x) //homie enemies 
    this.velocity.x = Math.cos(angle)
    this.velocity.y = Math.sin(angle)

    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    }

    else if(this.type === 'Homie Spinning'){
        this.radians += 0.1

        const angle = Math.atan2(player.y - this.center.y, player.x - this.center.x) //homie enemies 
        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)

        this.center.x += this.velocity.x
        this.center.y += this.velocity.y
    
        this.x = this.center.x + Math.cos(this.radians)*25
        this.y = this.center.y + Math.sin(this.radians)*25
   
    }

    else{
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    }
}
}
const friction = 0.99
class Particle 
{
constructor(x, y, radius, color, velocity)
    {
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
        this.alpha = 1
    }
    
    draw()
{
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.restore()
}
update(){
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha-= 0.01
    
}
}

class BackgroundParticle {
    constructor({position, radius = 3, color = 'green'}) {
        this.position = position
        this.radius = radius
        this.color = color
        this.alpha = 0.1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
        c.fillStyle = this.color
        c.fill()
        c.restore()

    }
}

//const power = new Power({x: 100,y: 100,velocity {x: 0,y: 0}})
class PowerUp {
    constructor( {position = {x: 0, y: 0}, velocity})
    {
        this.position =position
        
        this.velocity = velocity
        this.image = new Image()

        this.image.src = './img/lightningBolt.png'

        this.alpha = 1
        gsap.to(this, {
            alpha: 0,
             duration: 0.3,
            repeat: -1,
            yoyo: true
        })
        this.radians = 0
    }
    draw(){
        c.save()
        c.globalAlpha = this.alpha
        c.translate(this.position.x + this.image.width/2, this.position.y + this.image.height/2)
        c.rotate(this.radians)
        c.translate(- this.position.x - this.image.width/2, - this.position.y - this.image.height/2)
        c.drawImage(this.image, this.position.x, this.position.y)
        c.restore()
    }
update(){
    this.draw() 
    this.radians += 0.01
    this.position.x += this.velocity.x

}
}
canvas.width = innerWidth
canvas.height = innerHeight


let player
 
let projectiles = []
let enemies = []
let particles = []
let animationId
let intervalId
let score = 0
let powerUps = []
let frames = 0
let backgroundParticles = []
let game = {
    active: false
}

//audio

const shootAudio = new Howl({
    src: './audio/Basic_shoot_noise.wav',
    volume: 0.05
})

const damageTakenAudio = new Howl({
    src: './audio/Damage_taken.wav',
    volume: 0.2
})

const explodeAudio  = new Howl({
    src: './audio/Explode.wav',
    volume: 0.3
})

const deathAudio  = new Howl({
    src: './audio/Death.wav',
    volume: 0.1
})

const powerUpAudio  = new Howl({
    src: './audio/PowerUp_noise.wav',
    volume: 0.1
})

const selectAudio  = new Howl({
    src: './audio/Select.wav',
    volume: 0.2,
    html5: true
})
const backgroundAudio  = new Howl({
    src: './audio/Hyper.wav',
    volume: 0.1 ,
    loop: true
})


function init(){
    const x = canvas.width/2
const y = canvas.height/2
    player = new Player(x, y, 12, '#f3f0e8')
    projectiles=[]
    enemies=[]
    particles=[]
    powerUps = [

       
        
    ]
    animationId
    score = 0
    scoreEl.innerHTML = 0
    frames = 0
    backgroundParticles = [
      ]
      game = {
        active: true
      }
    const spacing = 30
      for (let x = 0; x<canvas.width + spacing; x+=spacing){
        for(let y =0; y< canvas.height + spacing; y+=spacing){
        backgroundParticles.push(  new BackgroundParticle({
            position: {
                x,
                y
            },
            radius: 3
        }))
    }
      }
}

function spawnEnemies() {
    intervalId = setInterval(() => {
        const radius = Math.random() * (30 - 4) + 5
        let x
        let y
        
        if( Math.random() < 0.5){
           x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
           y = Math.random() * canvas.height
        }
        else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random()* 360}, 50%, 50%)`

        const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x)
        const velocity =
        {
        x: Math.cos(angle),
        y: Math.sin(angle)

        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
        

    }, 1000)
}

/*  */
function spawnPowerUps(){
  spawnPowerUpsId = setInterval(() =>{
  powerUps.push(new PowerUp({
    position: {
        x: -20,
        y: Math.random() * canvas.height
    },
    velocity: {
        x: Math.random() + 3,
        y: 0
    }
  })
  )
}, 10000)
}
function animate()
{
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    frames++

    backgroundParticles.forEach(backgroundParticle => {
        backgroundParticle.draw()

        const dist = Math.hypot(player.x - backgroundParticle.position.x,
            player.y- backgroundParticle.position.y)
            if(dist < 100) {
                backgroundParticle.alpha = 0

                if(dist > 70) {
                    backgroundParticle.alpha = 0.5
                }
                
            }
            else if(dist > 100 && backgroundParticle.alpha<0.1)
            {
                backgroundParticle.alpha += 0.01
            }
            else if(dist > 100 && backgroundParticle.alpha > 0.1){
                backgroundParticle.alpha -= 0.01
            }
    })

    player.update()

    for(let i = powerUps.length-1; i>=0; i--){
        const powerUp = powerUps[i]

        if(powerUp.position.x > canvas.width){
            powerUps.splice(i, 1)
        }else powerUp.update()
        

        const dist = Math.hypot(
            player.x - powerUp.position.x,
            player.y - powerUp.position.y
        )
        // game  power up

        if(dist < powerUp.image.height / 2 + player.radius)
        {
    
            
                powerUps.splice(i, 1)
                player.powerUp = "MachineGun"
                player.color = 'Yellow'
                powerUpAudio.play()
                setTimeout(() => {
                    player.powerUp = null
                    player.color = 'White'
                }, 5000)
            
        }

    }
    //machine gun

    if(player.powerUp === "MachineGun") {
        const angle = Math.atan2(mouse.position.y - player.y,
            mouse.position.x - player.x)
        
            const velocity = {
                x: Math.cos(angle) * 8,
                y: Math.sin(angle) * 8
        
            }
            if(frames%2 === 0){
              projectiles.push
              (new Projectile(player.x,player.y, 5, 'yellow', velocity))
              
            }
            if(frames % 6 ===0){
                shootAudio.play()

            }
    }

    for (let index = particles.length-1; index >= 0; index--){ 
        const particle = particles[index]
   
        if(particle.alpha<=0){
            particles.splice(index, 1)
        }
        else {
            particle.update()
        }
        
    }

    for (let index = projectiles.length-1; index >= 0; index--){ 
        const projectile = projectiles[index]
     
        projectile.update()

        if(projectile.x - projectile.radius < 0 || projectile.x - projectile.radius > canvas.width
            || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height)
        {
                    projectiles.splice(index, 1)
             
        }
    }
    for (let index = enemies.length-1; index >= 0; index--){ 
        const enemy = enemies[index]

        enemy.update()

        const dist =  Math.hypot(player.x - enemy.x, player.y - enemy.y)

        //end game
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            clearInterval(intervalId)
            clearInterval(spawnPowerUpsId)
            deathAudio.play()
            game.active = false

            modalEl.style.display = 'block'
            gsap.fromTo('#modalEl', {scale: 0.8, opacity: 0 },
            {
                scale: 1,
            opacity: 1,
            expo: 'expo.out'
        })
            
            modalScoreEl.innerHTML = score
            

        }
        for (let  projectilesIndex = projectiles.length-1;  projectilesIndex >= 0;  projectilesIndex--){
            const projectile = projectiles[ projectilesIndex]
        
            const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
        
        
            if (dist - enemy.radius - projectile.radius < 1){
            {
                for(let i=0; i< enemy.radius*2; i++){
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 2,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random()*6),
                                y: (Math.random() - 0.5) * (Math.random()*6)
                            }
                        )
                    )
                }
                if(enemy.radius - 10 > 5)
                {
                    damageTakenAudio.play()
                    score +=10
                    scoreEl.innerHTML = score
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    
                        projectiles.splice(projectilesIndex, 1)
                   
                }else{
                   explodeAudio.play()
                score += 20
                scoreEl.innerHTML = score    
                backgroundParticles.forEach(backgroundParticle => {
                    /* gsap.to(backgroundParticle, {
                        color: 'White'
                    }) */
                    backgroundParticle.color = enemy.color
                })           
                enemies.splice(index, 1)
                projectiles.splice(projectilesIndex, 1)               
            }
            }
            
        }
        }
    
    } 
}

let audioInitial = false

function shoot({x,y}) {

    if(game.active) {
        const angle = Math.atan2(y - player.y,
        x - player.x)
    
        const velocity = {
            x: Math.cos(angle) * 10,
            y: Math.sin(angle) * 10
    
        }
        projectiles.push(new Projectile(
            player.x, player.y, 5, '#f3f0e8',
            velocity
        ))
        particles.push(new Particle(player.x, player.y , 5 ,'white', velocity
       
        ))  
        shootAudio.play() 
        }  
}
window.addEventListener('click', (event) => {
    
    if (!backgroundAudio.playing() && !audioInitial) {
        backgroundAudio.play()
       audioInitial = true
    }
    shoot({x: event.clientX,y: event.clientY})
    
})  
window.addEventListener('touchstart', (event) => {
    const x = event.touches[0].clientX
        const y = event.touches[0].clientY

        mouse.position.x = event.touches[0].clientX
    mouse.position.y = event.touches[0].clientY

        shoot({x, y})
})


const mouse = {
    position: {
        x: 0,
        y: 0
    }
}
 addEventListener('mousemove', (event) => {
    mouse.position.x = event.clientX
        mouse.position.y = event.clientY

 })
 addEventListener('touchmove', (event) => {
    mouse.position.x = event.touches[0].clientX
    mouse.position.y = event.touches[0].clientY
 

})

buttonEl.addEventListener('click', () =>{
selectAudio.play()
  init()
  animate()
  spawnEnemies()
  spawnPowerUps()
  gsap.to('#modalEl', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: 'expo.inOut',
    onComplete:() => {
        modalEl.style.display = 'none'
    }

})
}
)
startButtonEl.addEventListener('click', () =>{
    selectAudio.play()
init()
animate()
spawnEnemies()
spawnPowerUps( )
//startModalEl.style.display = 'none'
gsap.to('#startModalEl', {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: 'expo.inOut',
    onComplete:() => {
        startModalEl.style.display = 'none'
    }

})
})

volumeUp.addEventListener('click', () => {
    backgroundAudio.pause()
    volumeOff.style.display = 'block'
    volumeUp.style.display = 'none'
    
})

volumeOff.addEventListener('click', () => {
    if(audioInitial) 
    backgroundAudio.play()
    volumeOff.style.display = 'none'
    volumeUp.style.display = 'block'
})

window.addEventListener('resize', () =>{
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

document.addEventListener('visibilitychange', () => {
    if(document.hidden)   {
        clearInterval(intervalId)
        clearInterval(spawnPowerUpsId)
    
    }
    else {
        spawnEnemies()
        spawnPowerUps()

    }   
})

window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'ArrowRight':
            player.velocity.x += 1
            break
            case 'ArrowUp':
                player.velocity.y -= 1
                break 
                case 'ArrowLeft':
            player.velocity.x -= 1
            break
            case 'ArrowDown':
            player.velocity.y += 1
            break  
    }

})