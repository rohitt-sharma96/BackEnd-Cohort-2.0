const mouseFollower = document.querySelector('.mouse-follower')


let x = 0;
let y = 0;

document.body.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

   x = clientX;
   y = clientY;
   
   
})


function far(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`
    console.log('first')
    requestAnimationFrame(far)
}

// far()