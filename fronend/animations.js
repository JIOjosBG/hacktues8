var navigation = anime.timeline
({
    easing: 'easeInOutSine',
})

navigation.add
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
    duration: 1000,
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

var charts = anime.timeline(
{
    easing: 'easeInOutSine',
})

charts.add
({
    targets: '.chart1',
    opacity: [0, 1],
    translateY:[20, 0],
    duration: 1500,
    delay: 2000,
})

charts.add
({
    targets: '.--avg-values-right1',
    opacity: [0, 1],
    translateX: [90, 0],
    delay: anime.stagger(200, {start: 0}),
    easing: 'easeInOutExpo',
    duration: 1500,
}, '-=1500')