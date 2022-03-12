var smooth_animations = anime.timeline
(
{
    easing: 'easeInOutSine',
}
)

smooth_animations.add
({
    targets: ['.display-2'],
    translateY: [0, -20],
    opacity: [0,1],
    duration: 1000,
})
.add
({
    targets: '.--buttons-nav',
    opacity: [0,1],
    duration: 2000,
},'-=400')
.add
({
    targets: '.--button-left',
    opacity: [0, 1],
    translateX: [-20,0],
}, '-=1000')
.add
({
    targets: '.--button-right',
    opacity: [0, 1],
    translateX: [20, 0],
}, '-=1000')
.add
({
    targets: '.--avg-values-right',
    opacity: [0, 1],
    translateX: [90, 0],
    delay: anime.stagger(200, {start: 0})
}, '-=600')