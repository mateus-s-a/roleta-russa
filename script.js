// CONSTANTES E VARIÁVEIS UNIVERSAIS
const body = document.body
const script = document.querySelector('script')
const cx_titulo = document.querySelector('.cx_titulo')
const cx_btn_iniciar = document.querySelector('.cx_btn_iniciar')
const cx_inf = document.querySelector('.cx_inf')
const cx_btn_atirar = document.querySelector('.cx_btn_atirar')
const btn_atirar = document.querySelector('.btn_atirar')
const textoNumMortes = document.getElementById('nMorte')
const textoNumVitorias = document.getElementById('nVitoria')
let nMortes = 0
let nVitorias = 0
let nBalas = 6
let index_Cartucho

// TEXTO DO NÚMERO DE MORTES E VITÓRIAS
textoNumMortes.innerHTML = nMortes
textoNumVitorias.innerHTML = nVitorias

// CRIAÇÃO DA CAIXA CONTENDO INF E NÚMERO DE BALAS
const cx_nBalas = document.createElement('div')
const inf_nBalas = document.createElement('h1')
cx_nBalas.classList.add('cx_nBalas')
inf_nBalas.textContent = nBalas + "/6"

// CRIAÇÃO DO BOTÃO DE RECOMEÇAR
const btn_recomecar = document.createElement('h2')
btn_recomecar.setAttribute('class', 'btn_recomecar')
btn_recomecar.innerHTML = "↻"

// CARREGA O ARQUIVOS DE ÁUDIO
const contextoDeAudio = new AudioContext()
const bufferDeAudios = {}

    const somAmbiente = document.getElementById('som_ambiente')
    somAmbiente.volume = 0.9
    somAmbiente.play()
    
    const contextoDeAudioAmbiente = new AudioContext()
    const audioSource = contextoDeAudioAmbiente.createMediaElementSource(somAmbiente)
    
    const lowPassFilter = contextoDeAudioAmbiente.createBiquadFilter()
    lowPassFilter.type = 'lowpass'
    lowPassFilter.frequency.value = 3500

    audioSource.connect(lowPassFilter)
    lowPassFilter.connect(contextoDeAudioAmbiente.destination)




// FUNÇÕES DE INICIALIZAÇÃO E MANIPULAÇÃO DE ELEMENTOS
function indexCartuchoFuncao() {
    nBalas = 6
    index_Cartucho = Math.floor(Math.random() * 6) + 1
    // index_Cartucho = 2
    return index_Cartucho
}

function intro() {
    btn_atirar.style.pointerEvents = 'none'

    setTimeout(() => {
        cx_btn_iniciar.style.opacity = '0'
    }, 150)
    setTimeout(() => {
        cx_inf.style.display = 'flex'
        cx_btn_atirar.style.display = 'block'
        cx_btn_iniciar.remove()
    }, 750)
    
    setTimeout(() => {
        cx_titulo.style.opacity = '0'
        cx_inf.style.opacity = '1'
        cx_btn_atirar.style.opacity = '1'
    }, 850)
    setTimeout(() => {
        btn_atirar.style.cursor = 'pointer'
        btn_atirar.style.pointerEvents = 'all'
    }, 5000)
}

function criacaoElementoNumBalas() {
    setTimeout(() => {
        
        cx_nBalas.appendChild(inf_nBalas)
        body.insertBefore(cx_nBalas, script)
        
        setTimeout(() => {
            cx_nBalas.style.opacity = '1'
        }, 50)
    }, 1350)
}

function btnRecomecarFadeIn() {
    cx_btn_atirar.appendChild(btn_recomecar)

    setTimeout(() => {
        btn_recomecar.style.opacity = '1'
        btn_recomecar.style.fontSize = '5rem'
    }, 330)
}

function btnRecomecarResetar() {
    nBalas = 6
    inf_nBalas.textContent = nBalas + "/6"
    
    btn_recomecar.style.opacity = '0'
    btn_recomecar.style.fontSize = '0.00001rem'
    
    tocarSom('putting_back_roulette')

    setTimeout(() => {
        cx_btn_atirar.removeChild(btn_recomecar)
        btn_atirar.style.opacity = '1'
        
        btn_atirar.style.pointerEvents = 'all'
        btn_atirar.style.cursor = 'pointer'
        
    }, 1400)
}

// SOM
    function carregarSom(url, nomeDoSom) {
        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'

        request.onload = function() {
            contextoDeAudio.decodeAudioData(request.response, function(buffer) {
                bufferDeAudios[nomeDoSom] = buffer
            })
        }

        request.send()
    }

    function tocarSom(nomeDoSom) {
        const bufferSource = contextoDeAudio.createBufferSource()
        bufferSource.buffer = bufferDeAudios[nomeDoSom]
        bufferSource.connect(contextoDeAudio.destination)
        bufferSource.start(0)
    }

    carregarSom('sounds/Real Shot 002.wav', 'shot_2')
    carregarSom('sounds/Real Shot 003.wav', 'shot_3')
    carregarSom('sounds/Real Shot 004.wav', 'shot_4')
    carregarSom('sounds/Real Shot 005.wav', 'shot_5')
    carregarSom('sounds/Real Shot 006.wav', 'shot_6')

    carregarSom('sounds/Blank Shot 002.wav', 'blank_2')
    carregarSom('sounds/Blank Shot 003.wav', 'blank_3')
    carregarSom('sounds/Blank Shot 004.wav', 'blank_4')
    carregarSom('sounds/Blank Shot 005.wav', 'blank_5')
    carregarSom('sounds/Blank Shot 006.wav', 'blank_6')

    carregarSom('sounds/Putting back roulette (closing).wav', 'putting_back_roulette')





// EVENT LISTENERS
cx_btn_iniciar.addEventListener('click', () => {
    intro()
    criacaoElementoNumBalas()
    indexCartuchoFuncao()
})

btn_atirar.addEventListener('click', () => {
    if(nBalas != 2) {
        if(nBalas != index_Cartucho) {
            tocarSom('blank_' + nBalas)

            nBalas--
            
            inf_nBalas.textContent = nBalas + "/6"

            btn_atirar.style.pointerEvents = 'none'
            btn_atirar.style.cursor = 'default'
            setTimeout(() => {
                btn_atirar.style.pointerEvents = 'all'
                btn_atirar.style.cursor = 'pointer'
            }, 1000)
            

        } else {
            nMortes++
            textoNumMortes.innerHTML = nMortes
            
            indexCartuchoFuncao()
            btnRecomecarFadeIn()
            tocarSom('shot_' + nBalas)
    
            btn_atirar.style.pointerEvents = 'none'
            btn_atirar.style.cursor = 'default'
            btn_atirar.style.opacity = '0.3'

        }
    }
    else if(index_Cartucho == 1) {
        alert("Você venceu.")

        nVitorias++
        textoNumVitorias.innerHTML = nVitorias

        indexCartuchoFuncao()
        btnRecomecarFadeIn()
        tocarSom('blank_' + nBalas)

        btn_atirar.style.pointerEvents = 'none'
        btn_atirar.style.cursor = 'default'
        btn_atirar.style.opacity = '0.3'
    }
    else {
        nMortes++
        textoNumMortes.innerHTML = nMortes
        
        indexCartuchoFuncao()
        btnRecomecarFadeIn()
        tocarSom('shot_' + nBalas)

        btn_atirar.style.pointerEvents = 'none'
        btn_atirar.style.cursor = 'default'
        btn_atirar.style.opacity = '0.3'

    }
})

btn_atirar.addEventListener('mouseover', () => {
    cx_inf.style.filter = 'brightness(37.5%)'
    cx_nBalas.style.filter = 'brightness(37.5%)'
    cx_inf.style.transition = 'filter 0.625s ease'
    cx_nBalas.style.transition = 'filter 0.625s ease'
    
    lowPassFilter.frequency.value = 250
})
    
btn_atirar.addEventListener('mouseout', () => {
    cx_inf.style.filter = 'brightness(100%)'
    cx_nBalas.style.filter = 'brightness(100%)'

    lowPassFilter.frequency.value = 3500
})

btn_recomecar.addEventListener('click', () => {
    btnRecomecarResetar()
})
