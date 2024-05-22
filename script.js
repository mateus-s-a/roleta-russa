// CONSTANTES E VARIÁVEIS UNIVERSAIS
let aux

const body = document.body
const script = document.querySelector('script')
const cx_titulo = document.querySelector('.cx_titulo')
const cx_btn_iniciar = document.querySelector('.cx_btn_iniciar')
const cx_inf = document.querySelector('.cx_inf')
const cx_btn_atirar = document.querySelector('.cx_btn_atirar')
const primeiro_modo_Btn_Atirar = document.querySelector('.btn_atirar')
const textoNumMortes = document.getElementById('nMorte')
const textoNumVitorias = document.getElementById('nVitoria')

const textoInf_Icon_Muted_Unmuted = (document.querySelector('.icon_muted-unmuted').firstElementChild)
let icon_Muted_Unmuted = (document.querySelector('.icon_muted-unmuted').lastElementChild)
const img_revolver_bg = document.getElementById('img_revolver_bg')

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

    // CARREGA OS ARQUIVOS DE ÁUDIO
    const contextoDeAudio = new AudioContext()
    const bufferDeAudios = {}

        // COLOCAÇÃO E FUNCIONALIDADE DO SOM AMBIENTE
        let contextoDeAudioAmbiente, lowPassFilter
        
        const somAmbiente = document.getElementById('som_ambiente')
        somAmbiente.volume = 1
        
            // GAMBIARRA PARA FAZER O SOM AMBIENTE SER MUTADO E DESMUTADO, E, COM EFEITO LOW-PASS FILTER
            function gambiarra_somAmbiente() {
                if(somAmbiente.volume == 1) {
                    somAmbiente.play()
                    const audioSource = contextoDeAudioAmbiente.createMediaElementSource(somAmbiente)
                    
                    lowPassFilter = contextoDeAudioAmbiente.createBiquadFilter()
                    lowPassFilter.type = 'lowpass'
                    lowPassFilter.frequency.value = 8000
                
                    audioSource.connect(lowPassFilter)
                    lowPassFilter.connect(contextoDeAudioAmbiente.destination)
                }
            }
        
    // VARIÁVEIS DEPOIS DO CLICK 'cx_btn_iniciar', CAIXA DE SELEÇÃO DE MODO
    const cx_selecao_modo_jogo = document.createElement('div')
    const texto_escolha_modo_jogo = document.createElement('h1')
    const btn_primeiro_modo = document.createElement('h2')
    const btn_segundo_modo = document.createElement('h2')

    cx_selecao_modo_jogo.classList.add('cx_selecao_modo_de_jogo')

        // VARIÁVEL TEXTO DE INFORMAÇÃO SOBRE O MODO DE JOGO (MOUSE:HOVER)
        const txt_inf_modo_jogo = document.createElement('h3')
        txt_inf_modo_jogo.classList.add('txt_inf_modo_jogo')

    aux = [texto_escolha_modo_jogo, btn_primeiro_modo, btn_segundo_modo, txt_inf_modo_jogo]

    texto_escolha_modo_jogo.innerHTML = "Selecione o modo de jogo"
    btn_primeiro_modo.innerHTML = "por si mesmo"
    btn_segundo_modo.innerHTML = "1v1"

    for(el of aux) {
        cx_selecao_modo_jogo.appendChild(el)
    }



    // VARIÁVEIS DO BTN_VOLTAR
    const btn_voltar = document.createElement('div')
    const txt_btn_voltar = document.createElement('h1')
    btn_voltar.classList.add('btn_voltar')
    txt_btn_voltar.innerHTML = "↩ Voltar"
    btn_voltar.appendChild(txt_btn_voltar)

    // TRANSIÇÃO SUAVE (EASE) ENTRE OS VALORES DA PROPRIEDADE 'lowPassFilter.frequency.value'
    let estaTransicionando = false
    const duracaoTransicao = 450

    





// FUNÇÕES DE INICIALIZAÇÃO E MANIPULAÇÃO DE ELEMENTOS
const intro = function() {
    setTimeout(() => cx_btn_iniciar.style.opacity = '0', 150)
    setTimeout(() => cx_btn_iniciar.remove(), 650)

    setTimeout(() => {
        cx_titulo.style.opacity = '0'
        setTimeout(() => cx_titulo.style.display = 'none', 500)

        setTimeout(() => {
            cx_selecao_modo_jogo.style.display = 'grid' // *
            setTimeout(() => cx_selecao_modo_jogo.style.opacity = '1', 50)
        }, 600)
    }, 750)

    body.appendChild(cx_selecao_modo_jogo)
}

function funcionamento_Btn_Voltar(modoDeJogo) {
    if(modoDeJogo == 1) {
        cx_titulo.display = 'none'
        btn_voltar.style.opacity = '0'
        cx_inf.style.opacity = '0'
        cx_inf.style.transition = 'opacity 0.5s ease'
        cx_btn_atirar.style.opacity = '0'
        cx_btn_atirar.style.transition = 'opacity 0.5s ease'
        cx_nBalas.style.opacity = '0'
        cx_nBalas.style.transition = 'opacity 0.5s ease'
        setTimeout(() => {
            cx_titulo.style.display = 'none'
            cx_inf.style.display = 'none'
            cx_btn_atirar.style.display = 'none'
            cx_nBalas.style.display = 'none'

            body.removeChild(btn_voltar)

            setTimeout(() => {
                cx_selecao_modo_jogo.style.display = 'grid' // *
                // cx_selecao_modo_jogo.style.opacity = '1'

                setTimeout(() => cx_selecao_modo_jogo.style.opacity = '1', 100)
            }, 50)
            
        }, 500)
    }
}

    // PRIMEIRO MODO
    function indexCartuchoFuncao_modo_1() {
        nBalas = 6
        index_Cartucho = Math.floor(Math.random() * 6) + 1
        // index_Cartucho = 1
        return index_Cartucho
    }

    function criacaoElementoNumBalas_1_modo() {
        setTimeout(() => {
            cx_nBalas.appendChild(inf_nBalas)
            body.insertBefore(cx_nBalas, script)
            
            setTimeout(() => cx_nBalas.style.opacity = '1', 50)
        }, 1350)
    }

        function btnRecomecarFadeIn() {
            cx_btn_atirar.appendChild(btn_recomecar)
            btn_recomecar.style.cursor = 'pointer'
            btn_recomecar.style.pointerEvents = 'all'
        
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
                primeiro_modo_Btn_Atirar.style.opacity = '1'
                
                primeiro_modo_Btn_Atirar.style.pointerEvents = 'all'
                primeiro_modo_Btn_Atirar.style.cursor = 'pointer'
                
            }, 1400)
        }

    
    // SEGUNDO MODO
    function criacaoElementoNumBalas_2_modo() {

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

// FUNÇÃO AUX PARA INTERPOLAR LINEARMENTE ENTRE DOIS VALORES DO TRANSIENTE (LOW-PASS FILTER)
function lerp(ini, fim, t) {
    return ini * (1 - t) + fim * t
}
function comecarTransicao(valorIni, valorFim) {
    if(estaTransicionando) return

    estaTransicionando = true
    const tempoInicial = performance.now()

    function animarTransicao(duracaoAtual) {
        const tempoDecorrido = duracaoAtual - tempoInicial
        const t = tempoDecorrido / duracaoTransicao

        if(t >= 1) {
            lowPassFilter.frequency.value = valorFim
            estaTransicionando = false
            return
        }

        const valorInterpolado = lerp(valorIni, valorFim, t)
        lowPassFilter.frequency.value = valorInterpolado

        requestAnimationFrame(animarTransicao)
    }

    requestAnimationFrame(animarTransicao)
}




// EVENT LISTENERS
cx_btn_iniciar.addEventListener('click', () => intro())

btn_voltar.addEventListener('click', () => {
    funcionamento_Btn_Voltar(1)
})

    // PRIMEIRO MODO — 'POR SI SÓ'
    btn_primeiro_modo.addEventListener('click', () => {
        cx_selecao_modo_jogo.style.opacity = '0'
        body.insertBefore(btn_voltar, cx_titulo.nextSibling)
        btn_voltar.style.display = 'block'

        primeiro_modo_Btn_Atirar.style.cursor = 'default'
        primeiro_modo_Btn_Atirar.style.pointerEvents = 'none'

        cx_inf.style.transition = 'opacity 9s ease'
        cx_btn_atirar.style.transition = 'opacity 9s ease'
        cx_nBalas.style.transition = 'opacity 9s ease'

        criacaoElementoNumBalas_1_modo()

        if(!body.querySelector('.btn_recomecar')) {
            indexCartuchoFuncao_modo_1()
            inf_nBalas.textContent = nBalas + "/6"
        }

        setTimeout(() => {
            cx_selecao_modo_jogo.style.display = 'none'
            cx_inf.style.display = 'flex'
            cx_btn_atirar.style.display = 'block'
            cx_nBalas.style.display = 'block'

            cx_titulo.style.display = 'block'
            setTimeout(() => {
                cx_inf.style.opacity = '1'
                cx_btn_atirar.style.opacity = '1'
            }, 100)
            setTimeout(() => {
                if(!body.querySelector('.btn_recomecar')) {
                    primeiro_modo_Btn_Atirar.style.cursor = 'pointer'
                    primeiro_modo_Btn_Atirar.style.pointerEvents = 'all'
                }
            }, 4000)
        }, 1000)
        setTimeout(() => btn_voltar.style.opacity = '1', 900)
    })
        btn_primeiro_modo.addEventListener('mouseover', () => {
            txt_inf_modo_jogo.innerHTML = "Simples o suficiente para acabar com sua vida. Em cada rodada <big>1</big> bala é colocada aleatoriamente na roleta. Tenha em mente que sair no meio da partida recomeçará desde o início."
            txt_inf_modo_jogo.style.display = 'block'
            setTimeout(() => {
                txt_inf_modo_jogo.style.opacity = '1'
                txt_inf_modo_jogo.style.transform = 'translateY(-5px)'
            }, 10)
        })
        btn_primeiro_modo.addEventListener('mouseout', () => {
            txt_inf_modo_jogo.style.opacity = '0'
            txt_inf_modo_jogo.style.transform = 'translateY(5px)'
            setTimeout(() => {
                txt_inf_modo_jogo.style.display = 'none'
            }, 250)
        })

            // BTN_ATIRAR DO PRIMEIRO MODO
            primeiro_modo_Btn_Atirar.addEventListener('click', () => {
                if(nBalas != 2) {
                    if(nBalas != index_Cartucho) {
                        tocarSom('blank_' + nBalas)
            
                        nBalas--
                        
                        inf_nBalas.textContent = nBalas + "/6"
            
                        primeiro_modo_Btn_Atirar.style.pointerEvents = 'none'
                        primeiro_modo_Btn_Atirar.style.cursor = 'default'
                        setTimeout(() => {
                            primeiro_modo_Btn_Atirar.style.pointerEvents = 'all'
                            primeiro_modo_Btn_Atirar.style.cursor = 'pointer'
                        }, 1000)
                        
            
                    } else {
                        nMortes++
                        textoNumMortes.innerHTML = nMortes
                        
                        tocarSom('shot_' + nBalas)
            
                        nBalas--
                        inf_nBalas.textContent = nBalas + "/6"
            
                        indexCartuchoFuncao_modo_1()
                        btnRecomecarFadeIn()
                
                        primeiro_modo_Btn_Atirar.style.pointerEvents = 'none'
                        primeiro_modo_Btn_Atirar.style.cursor = 'default'
                        primeiro_modo_Btn_Atirar.style.opacity = '0.3'
            
                        comecarTransicao(lowPassFilter.frequency.value, 150)
            
                    }
                }
                else if(index_Cartucho == 1) {
                    nVitorias++
                    textoNumVitorias.innerHTML = nVitorias
            
                    tocarSom('blank_' + nBalas)
            
                    nBalas--
                    inf_nBalas.textContent = nBalas + "/6"
            
                    indexCartuchoFuncao_modo_1()
                    btnRecomecarFadeIn()
            
                    primeiro_modo_Btn_Atirar.style.pointerEvents = 'none'
                    primeiro_modo_Btn_Atirar.style.cursor = 'default'
                    primeiro_modo_Btn_Atirar.style.opacity = '0.3'
                }
                else {
                    nMortes++
                    textoNumMortes.innerHTML = nMortes
                    
                    tocarSom('shot_' + nBalas)
            
                    nBalas--
                    inf_nBalas.textContent = nBalas + "/6"
                    
                    indexCartuchoFuncao_modo_1()
                    btnRecomecarFadeIn()
            
                    primeiro_modo_Btn_Atirar.style.pointerEvents = 'none'
                    primeiro_modo_Btn_Atirar.style.cursor = 'default'
                    primeiro_modo_Btn_Atirar.style.opacity = '0.3'
            
                    comecarTransicao(lowPassFilter.frequency.value, 150)
            
                }
            })
            
            primeiro_modo_Btn_Atirar.addEventListener('mouseover', () => {
                cx_inf.style.filter = 'brightness(37.5%) blur(2px)'
                cx_nBalas.style.filter = 'brightness(37.5%) blur(2px)'
                cx_inf.style.transition = 'filter 0.625s ease'
                cx_nBalas.style.transition = 'filter 0.625s ease'
                
                img_revolver_bg.style.filter = 'invert(100%) blur(2px) brightness(10%)'
                img_revolver_bg.style.transition = 'opacity 0.625s ease, filter 0.625s ease'
            
                if(aux == 1) comecarTransicao(lowPassFilter.frequency.value, 150)
            })
                
            primeiro_modo_Btn_Atirar.addEventListener('mouseout', () => {
                cx_inf.style.filter = 'brightness(100%) blur(0)'
                cx_nBalas.style.filter = 'brightness(100%) blur(0)'
            
                img_revolver_bg.style.filter = 'invert(100%) blur(0) brightness(17%)'
            
                if(aux == 1) comecarTransicao(lowPassFilter.frequency.value, 8000)
            })
        
        btn_recomecar.addEventListener('click', () => {
            btnRecomecarResetar()
            if(aux == 1) comecarTransicao(lowPassFilter.frequency.value, 8000)
        })

    // SEGUNDO MODO — 1V1
    btn_segundo_modo.addEventListener('click', () => {
        alert("em breve")
    })
        btn_segundo_modo.addEventListener('mouseover', () => {
            txt_inf_modo_jogo.innerHTML = "Mire na cabeça. Jogue contra um desconhecido condenado como você. Atirar em si mesmo com uma bala de festim garantirá a sua vez. A cada tiro real dado, diminuirá a chance de sobrevivência da próxima."
            txt_inf_modo_jogo.style.display = 'block'
            setTimeout(() => {
                txt_inf_modo_jogo.style.opacity = '1'
                txt_inf_modo_jogo.style.transform = 'translateY(-5px)'
            }, 10)
        })
        btn_segundo_modo.addEventListener('mouseout', () => {
            txt_inf_modo_jogo.style.opacity = '0'
            txt_inf_modo_jogo.style.transform = 'translateY(5px)'
            setTimeout(() => {
                txt_inf_modo_jogo.style.display = 'none'
            }, 250)
        })











// AÇÃO BTN MUTAR/DESMUTAR
icon_Muted_Unmuted.addEventListener('click', () => {
    if(!contextoDeAudioAmbiente) {
        contextoDeAudioAmbiente = new AudioContext()
        somAmbiente.volume = 1
        gambiarra_somAmbiente()
        
        if(icon_Muted_Unmuted.alt === "Muted") {
            icon_Muted_Unmuted.src = "https://i.ibb.co/pJ1DV1L/Unmuted.png"
            icon_Muted_Unmuted.alt = "Unmuted"
        }
        aux = 0
        aux++
        return contextoDeAudioAmbiente // desbug da troca do icon mutado-desmutado
    }

    if(icon_Muted_Unmuted.alt === "Muted") {
        icon_Muted_Unmuted.src = "https://i.ibb.co/pJ1DV1L/Unmuted.png"
        icon_Muted_Unmuted.alt = "Unmuted"

        somAmbiente.volume = 1

    } else {
        icon_Muted_Unmuted.src = "https://i.ibb.co/7VgQGzD/Muted.png"
        icon_Muted_Unmuted.alt = "Muted"

        somAmbiente.volume = 0
    }
})

icon_Muted_Unmuted.addEventListener('mouseover', () => {
    textoInf_Icon_Muted_Unmuted.style.display = 'block'
    setTimeout(() => {
        textoInf_Icon_Muted_Unmuted.style.opacity = '1'
        textoInf_Icon_Muted_Unmuted.style.transform = 'translateY(0)'
    }, 100)
})

icon_Muted_Unmuted.addEventListener('mouseout', () => {
    textoInf_Icon_Muted_Unmuted.style.opacity = '0'
    textoInf_Icon_Muted_Unmuted.style.transform = 'translateY(4vh)'
    setTimeout(() => textoInf_Icon_Muted_Unmuted.style.display = 'none', 100)
})