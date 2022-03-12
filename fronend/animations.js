var smooth_animations = anime.timeline
(
{
    easing: 'easeInOutSine',
    duration: 1000
}
)

smooth_animations.add
({
    targets: ['.display-2'],
    translateY: [0, -20],
    opacity: [0,1],
})
.add
({
    targets: '.--buttons-nav',
    opacity: [0,1],
},'-=500')
.add
({
    targets: '.--button-period',
    opacity: [0, 1],
    translateX: [-20,0],
}, '-=700')
.add
({

})